angular.module('twitterApiApp').factory('channelsFactory', ['$http', '$q', function($http, $q) {
  var deferred = $q.defer();
  // service object to return
  var channelsFact = {};
  channelsFact.channels = [];

  channelsFact.getChannels = function () {
    $http.get("/Channels").then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        channelsFact.channels.push(response.data[i]);
      };
      deferred.resolve(channelsFact.channels);
    }, function(error) {
        // Reject promise with error message
        deferred.reject(error.message);
    });
    // Return promise
    return deferred.promise;
  };
  return channelsFact;
}]);



angular.module('twitterApiApp').factory('publicationsFactory', ['$http', '$q', function($http, $q) {
  var deferred = $q.defer();

  var publicationsFact = {};
  publicationsFact.publications = [];
  publicationsFact.busyLoadingData = false;

  publicationsFact.getQueryStart = function () {
    publicationsFact.queryStart = publicationsFact.publications.length > 0 ? publicationsFact.publications.length : 0
  };

  publicationsFact.getPublications = function () {
    if (publicationsFact.busyLoadingData) return;
    publicationsFact.busyLoadingData = true;

    publicationsFact.getQueryStart();
    var query = publicationsFact.queryStart ? ("&_start="+publicationsFact.queryStart) : "";

    $http.get("/Publications?_sort=timestamp&_order=DESC" + query + "&_limit=3").then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        publicationsFact.publications.push(response.data[i]);
      };
      publicationsFact.busyLoadingData = false;
      deferred.resolve(publicationsFact.publications);
    }, function(error) {
       // Reject promise with error message
       deferred.reject(error.message);
    });
    // Return promise
    return deferred.promise;
  };
  return publicationsFact;
}]);



angular.module('twitterApiApp').factory('postNewsFactory', ['$http', 'publicationsFactory', 'channelsFactory',
                                                      function($http, publicationsFactory, channelsFactory) {
  var postNewsFact = {};

  postNewsFact.postNews = function (newsText, selectedChannels, author) {
    var time = new Date().toISOString();
    var newPublication = {
      "text": newsText,
      "author": author,
      "timestamp": time,
      "channels": selectedChannels.channels
    };
    $http.post("/Publications", newPublication).then(function(response) {
        publicationsFactory.publications.splice(0, 0, response.data);
    });
  };
  return postNewsFact;
}]);

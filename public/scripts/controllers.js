twitterApiApp.controller("proposeNewsCtrl", ['channelsFactory', 'postNewsFactory', '$scope', function (channelsFactory, postNewsFactory, $scope) {

  $scope.init = function () {
    $scope.postNews = postNewsFactory.postNews;
    $scope.isChannelSelected = false;
    $scope.isClickOnChannel = false;
    $scope.selectedChannels = { channels: [] };
  };

  $scope.init();

  channelsFactory.getChannels().then(function(results) {
        $scope.channelsList = results;
    });

  $scope.isChecked = function (id) {
    $scope.isClickOnChannel = true;
    if ($scope.selectedChannels.channels.length != 0) {
      $scope.isChannelSelected = true;
    }
    else {
      $scope.isChannelSelected = false;
    }
    console.log($scope.selectedChannels.channels);
  };

  $scope.clearForm = function () {
    $scope.proposeNewsForm.$setPristine();
    $scope.newsText = "";
    $scope.author = "";
    $scope.selectedChannels.channels = [];
  };
}]);


twitterApiApp.controller("showPublicationsCtrl", ['publicationsFactory', '$scope', function (publicationsFactory, $scope) {
  $scope.publicationsFactory = publicationsFactory;
  $scope.uploadMore = function() {
    $scope.publicationsFactory.getPublications().then(function(results) {
          $scope.publications = results;
      });
  };
  $scope.uploadMore();
}]);

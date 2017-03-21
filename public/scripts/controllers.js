twitterApiApp.controller("proposeNewsCtrl", ['channelsFactory', 'postNewsFactory', '$scope', function (channelsFactory, postNewsFactory, $scope) {

  $scope.channelsList = channelsFactory.channels;
  channelsFactory.getChannels();

  $scope.postNews = postNewsFactory.postNews;

  $scope.selectedChannels = [];
  $scope.isChannelSelected = false;
  $scope.isClickOnChannel = false;

  $scope.isChecked = function (id) {
    $scope.isClickOnChannel = true;
    var index = $scope.selectedChannels.indexOf(id);
    if (index == -1) {
          $scope.selectedChannels.push(id);
      }
    else {
          $scope.selectedChannels.splice(index, 1);
    };
    if ($scope.selectedChannels.length != 0) {
      $scope.isChannelSelected = true;
    }
    else {
      $scope.isChannelSelected = false;
    }
    console.log($scope.selectedChannels);
  };

  $scope.clearForm = function () {
    $scope.proposeNewsForm.$setPristine();
    $scope.newsText = "";
    $scope.author = "";
    $scope.selectedChannels = [];
  };

}]);

twitterApiApp.controller("showPublicationsCtrl", ['publicationsFactory', '$scope', function (publicationsFactory, $scope) {
  $scope.publicationsFactory = publicationsFactory;
  $scope.publicationsFactory.getPublications();
}]);

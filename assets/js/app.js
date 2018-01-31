var feedApp = angular.module('feedApp', ['ngResource', 'angularMoment', 'ngAnimate']);

feedApp.controller('FeedCtrl', ['$scope', '$resource', '$timeout', '$http', function($scope, $resource, $timeout, $http) {
  $scope.feedEntries = $resource('/feed').query();

  io.socket.get('/feed/subscribe', function(data, jwr) {
    io.socket.on('new_entry', function(entry) {
      $timeout(function() {
        $scope.feedEntries.unshift(entry);
      });
    });
  });

  $scope.createNewFeed = function() {
    var icon = 'heart';
    var title = faker.name.jobTitle();
    var description = faker.name.jobDescriptor();
    var apiUrl = '/feed' + '/create?icon=' + icon + '&title='+ title + '&description=' + description;

    $http.get(apiUrl)
      .then(function(response) {
        //created
      });
  }
}]);

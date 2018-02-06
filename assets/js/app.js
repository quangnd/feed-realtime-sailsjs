var feedApp = angular.module('feedApp', ['ngResource', 'angularMoment', 'ngAnimate']);

feedApp.controller('FeedCtrl', ['$scope', '$resource', '$timeout', '$http', function ($scope, $resource, $timeout, $http) {
  $scope.feedEntries = $resource('/feed').query();
  $scope.amountOfConnectedClient = 0;
  $scope.chats = [];

  io.socket.get('/feed/subscribe', function (data, jwr) {
    io.socket.on('new_entry', function (entry) {
      $timeout(function () {
        $scope.feedEntries.unshift(entry);
      });
    });
  });

  io.socket.get('/chat/joinChat', function (data, jwr) {
    console.log('in join chat');
    io.socket.on('chat', function(chat) {
      $timeout(function () {
        $scope.chats.unshift(chat);
      });
    })
  });

  $scope.createNewFeed = function () {
    var icon = 'heart';
    var title = faker.name.jobTitle();
    var description = faker.name.jobDescriptor();
    var apiUrl = '/feed' + '/create?icon=' + icon + '&title=' + title + '&description=' + description;

    $http.get(apiUrl)
      .then(function (response) {
        //created
      });
  }

  $scope.chat = function () {
    console.log('on chat');
    var message = $scope.chatMessage;
    //TODO: change with another userId
    io.socket.get('/chat/create?userId=1&message=' + message, function (e) {
      $scope.$apply();
    });
  }
}]);

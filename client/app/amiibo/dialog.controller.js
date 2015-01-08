'use strict';

angular.module('amiiBroApp').controller('DialogCtrl', ['$scope', '$mdDialog', 'store', 'item', function ($scope, $mdDialog, store, item) {
  $scope.store = store;
  $scope.item = item;
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}]);
'use strict';

angular.module('amiiBroApp').controller('ListBottomSheetCtrl', ['$scope', '$mdBottomSheet', 'stores', 'item', function ($scope, $mdBottomSheet, stores, item) {
  $scope.stores = stores;
  $scope.listItemClick = function($index, $event) {
    var clickedStores = $scope.stores[$index];
    var location = {
      store: clickedStores,
      item: item
    };
    $mdBottomSheet.hide(location, $event);
  };
  $scope.viewItem = function($event) {
    var location = {
      store: null,
      item: item
    };
    $mdBottomSheet.hide(location, $event);
  };
}]);
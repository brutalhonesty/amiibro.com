'use strict';

angular.module('amiiBroApp').controller('AmiiboCtrl', ['$scope', 'amiiboService', '$routeParams', '$mdToast', '$location', '$window', '$mdBottomSheet', '$mdDialog', function ($scope, amiiboService, $routeParams, $mdToast, $location, $window, $mdBottomSheet, $mdDialog) {
  amiiboService.byName($routeParams.amiibo).success(function (amiiboResp) {
    $scope.amiibo = amiiboResp.basic;
  }).error(function (error) {
    $mdToast.show(
      $mdToast.simple()
      .content(error.message)
      .position('bottom left')
      .hideDelay(1000)
    );
    $location.path('/');
  });
  $scope.radius = 10;
  $scope.zipcode = parseInt($window.localStorage.getItem('zipcode'), 10) || null;
  $scope.getRows = function(arrLength) {
    var rows = Math.ceil(arrLength / 3);
    var rowList = [];
    for (var i = 0; i < rows; i++) {
      rowList.push(i);
    }
    console.log(rowList);
    return rowList;
  };
  $scope.retailers = [{
    title: 'Bestbuy',
    shortname: 'bestbuy',
    image: '//i.imgur.com/UfQ1ATg.png'
  },{
    title: 'Gamestop',
    shortname: 'gamestop',
    image: '//i.imgur.com/lJpM7Uv.png'
  },{
    title: 'Target',
    shortname: 'target',
    image: '//i.imgur.com/JfXicjq.png'
  },{
    title: 'Amazon',
    shortname: 'amazon',
    image: '//i.imgur.com/wDRk2Vl.png'
  },{
    title: 'Walmart',
    shortname: 'walmart',
    image: '//i.imgur.com/a0pijTQ.png'
  },{
    title: 'Toys R Us',
    shortname: 'toysrus',
    image: '//i.imgur.com/KAQeOU9.png'
  }];
  $scope.search = function () {
    $window.localStorage.setItem('zipcode', $scope.zipcode);
    $scope.searching = true;
    var statusData = {
      name: $routeParams.amiibo,
      radius: $scope.radius,
      zip: $scope.zipcode
    };
    amiiboService.status(statusData).success(function (statusResp) {
      $scope.status = statusResp;
      $scope.searching = false;
    }).error(function (error) {
      $scope.searching = false;
      $mdToast.show(
        $mdToast.simple()
        .content(error.message)
        .position('bottom left')
        .hideDelay(1000)
      );
    });
  };
  $scope.getStores = function (retailname) {
    if(!$scope.status[retailname]['stores']) {
      return [];
    }
    var stores = $scope.status[retailname]['stores'].map(function (store) {
      if(store.inStoreAvailability) {
        return store;
      }
    });
    return stores.filter(function (n) { return n !== undefined; });
  };
  $scope.getItem = function(retailname) {
    return $scope.status[retailname]['item'] || null;
  };
  $scope.viewRetailer = function(retailname, $event) {
    $mdBottomSheet.show({
      templateUrl: 'app/amiibo/bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event,
      locals: {
        stores: $scope.getStores(retailname),
        item: $scope.getItem(retailname)
      }
    }).then(function (location, $event) {
      $mdDialog.show({
        controller: 'DialogCtrl',
        templateUrl: 'app/amiibo/store-dialog.html',
        targetEvent: $event,
        locals: {
          store: location.store || null,
          item: location.item || null
        }
      })
      .then(function() {
      }, function() {
      });
    });
  };
}]);

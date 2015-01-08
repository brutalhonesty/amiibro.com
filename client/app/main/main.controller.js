'use strict';

angular.module('amiiBroApp').controller('MainCtrl', ['$scope', '$location', 'amiiboService', '$window', function ($scope, $location, amiiboService, $window) {
  $scope.viewPage = function (amiiboLink) {
    $location.path(amiiboLink);
  };
  $scope.getRows = function (arrLength) {
    var rows = Math.ceil(arrLength / 5);
    var rowList = [];
    for (var i = 0; i < rows; i++) {
      rowList.push(i);
    }
    return rowList;
  };
  $scope.amiibos = JSON.parse($window.localStorage.getItem('amiibos')) || null;
  if(!$scope.amiibos) {
    amiiboService.getBasic().success(function (amiiboResp) {
      $scope.amiibos = amiiboResp;
    }).error(function (error) {
      console.log(error);
      // TODO Show error.
    });
  }
  $scope.updatePurchases = function (amiibo) {
    var amiibos = JSON.parse($window.localStorage.getItem('amiibos')) || $scope.amiibos;
    for (var i = 0; i < amiibos.length; i++) {
      var oldAmiibo = amiibos[i];
      if(amiibo.title === oldAmiibo.title) {
        amiibos[i] = amiibo;
        break;
      }
    }
    $window.localStorage.setItem('amiibos', JSON.stringify(amiibos));
  };
}]);

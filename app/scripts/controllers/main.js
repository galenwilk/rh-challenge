'use strict';

/**
 * @ngdoc function
 * @name challengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the challengeApp
 */
angular.module('challengeApp')
  .controller('MainCtrl', ['$scope', '$timeout', 'companyService', function ($scope, $timeout, companyService) {
    // hardcode company ID to 1 based on requirement
    var companyId = 1;

    $scope.service = companyService;
    // init request for company data
    $scope.service.initCompanies(companyId);

    // watch for company data promise to resolve
    $scope.$watch('service.getCompany()', function(newVal) {
      $scope.company = newVal;
    });

    var timeout = null;
    // save form when valid (company name input is required)
    var saveUpdates = function() {
      if ($scope.companyForm.$valid) {
        $scope.service.saveCompany(companyId, $scope.company);
      } else {
        console.log('Tried to save updates to Company but the form is invalid.');
      }
    };
    // add a timeout to help with auto saving
    var debounceUpdate = function(newVal, oldVal) {
      // check if input value has changed
      if (newVal !== oldVal) {
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(saveUpdates, 1000);
      }
    };
    $scope.$watch('company.name', debounceUpdate);
  }]);

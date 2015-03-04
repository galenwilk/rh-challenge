'use strict';

/**
 * @ngdoc function
 * @name challengeApp.service:companyService
 * @description
 * # companyService
 * Factory of the challengeApp
 */
 angular.module('challengeApp')
  .service('companyService', ['$http', function($http) {
    var that = this;
      this.companies = {};

    // init the data request
    this.initCompanies = function(companyId) {
      // would be path to server
      $http.get('scripts/data/companies/' + companyId + '.json').success(function(data) {
          that.companies = data;
      }).error(function(response, status) {
        console.log('The request failed with response ' + response + 'and status ' + status);
      });
    };
    // get the company after promise has been resolved
    this.getCompany = function() {
      return this.companies;
    };

    this.saveCompany = function(companyId, data) {
    /* Example call to an endpoint on the server...
      $http.put('path-to-server/companies/' + companyId + '.json', data).success(function(data) {
        console.log('Company saved', data);
      }).error(function(response, status) {
        console.log('The request failed with response ' + response + 'and status ' + status);
      }); */
      console.log('Company name saved', data);
    };
  }]);

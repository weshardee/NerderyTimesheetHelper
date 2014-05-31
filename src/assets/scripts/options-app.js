define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // load dependencies
    var angular = require('angular');
    var _ = require('lodash');

    // setup app
    var appName = 'optionsApp'
    var app = angular.module(appName, []);

    // register constants;
    app.constant('_', _);

    // register controllers
    app.controller('options', require('controllers/options'));

    // initialize app
    angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);

    return app;
});

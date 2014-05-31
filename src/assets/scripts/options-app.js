define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // load dependencies
    var angular = require('angular');
    var _ = require('lodash');

    // setup app
    var app = angular.module('optionsApp', []).constant('_', _);

    // register controllers
    app.controller('options', require('controllers/options'));

    return app;
});

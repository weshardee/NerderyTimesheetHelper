define(function(require, exports, module) { // jshint ignore:line
    var _ = require('lodash');
    var Keys = require('keys');

    var STATUS_ERROR = 'status_error';
    var STATUS_SUCCESS = 'status_success';

    var optionsController = function($scope) {

        $scope.bindings = [
            {
                // value: Keys.newCombo('Up', ['shift']),
                id: 'inc_start_time',
                label: 'Increment Start Time'
            },
            {
                // value: Keys.newCombo('Down', ['shift']),
                id: 'dec_start_time',
                label: 'Decrement Start Time'
            },
            {
                // value:   Keys.newCombo('Up',   ['ctrl']),
                id: 'inc_end_time',
                label: 'Increment End Time'
            },
            {
                // value:   Keys.newCombo('Down', ['ctrl']),
                id: 'dec_end_time',
                label: 'Decrement End Time'
            },
            {
                // value:        Keys.newCombo('Up',   ['alt']),
                id: 'inc_row',
                label: 'Navigate Up One Row'
            },
            {
                // value:        Keys.newCombo('Down', ['alt']){
                id: 'dec_row',
                label: 'Navigate Down One Row'
            }
        ]

        $scope.status = {
            message: null,
            type: null
        };

        // $scope.status.message = 'test';
        // $scope.status.type = STATUS_ERROR;
        // var $ = require('jquery');
        // var _ = require('lodash');
        // var Keys = require('./keys/keys');



        // Default bindings
        var DEFAULT_BINDINGS = {
            // 'inc_start_time': Keys.newCombo('Up',   ['shift']),
        };

        // var Bindings = _.clone(DEFAULT_BINDINGS);

        // Notifications
        // var $status = $('#status');
        // function success(message) {
        //     $status.removeClass(STATUS_ERROR)
        //         .addClass(STATUS_SUCCESS)
        //         .html(message)
        //         .fadeIn('fast').delay(1000).fadeOut('fast');
        // }
        // function error(message) {
        //     $status.removeClass(STATUS_SUCCESS)
        //         .addClass(STATUS_ERROR)
        //         .html(message)
        //         .fadeIn('fast').delay(1000).fadeOut('fast');
        // }

        // Bindings
        function saveBinding(combo, name) {
            // localStorage[name] = Keys.getComboString(combo);
        }

        function restoreBinding(combo, name) {
            var comboString = localStorage[name];
            if (comboString) {
                // Bindings[name] = Keys.comboFromString(comboString);
            }
        }

        function displayBinding(combo, name) {
            var $input = $('#' + name);
            // $input.val(Keys.getComboString(combo));
        }

        $scope.keydown = function(e) {
            // Get the current key combo
            var combo = Keys.getComboForEvent(e);

            // On ESC or BACKSPACE, clear the input
            // if (combo.keyCode === Keys.Esc || combo.keyCode === Keys.Backspace) {
            //     $(this).val('');
            //     // Allow normal tab behavior
            // } else if (combo.keyCode === Keys.Tab) {
            //     return;
            // // Otherwise, bind the current key combination
            // } else {
            //     // Update current keybinding
            //     Bindings[$(this).attr('name')] = combo;
            //     // Display new binding
            //     $(this).val(Keys.getComboString(combo));
            // }
            return false;
        };

        // Saves options to localStorage.
        $scope.save = function() {
            // Update stored options
            console.log('save');
            _.each($scope.bindings, saveBinding);
            $scope.status.message = 'Options Saved.';
            $scope.status.type = STATUS_SUCCESS;
        }

        // Restores options from localStorage
        $scope.load = function() {
            _.each($scope.bindings, restoreBinding);
        }

        // Resets the options to the defaults
        $scope.reset = function() {
            $scope.bindings = _.clone(DEFAULT_BINDINGS);
            $scope.save();
        }

        // On load, restore options if they were previously stored
        $scope.load();

        // Wire up keybind input fields
        // $('input[data-keybinder]').on('keydown', onKeydown);

    };

    return ['$scope', optionsController]
});

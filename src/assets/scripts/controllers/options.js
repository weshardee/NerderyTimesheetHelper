define(function(require, exports, module) { // jshint ignore:line
    var _ = require('lodash');
    var Keys = require('keys');
    var isMac = require('ismac');

    var STATUS_ERROR = 'status_error';
    var STATUS_SUCCESS = 'status_success';

    // var codeTemplate = require('hbs!template');

    var optionsController = function($scope) {

        var DEFAULT_BINDINGS = {
            'inc_start_time': Keys.newCombo('Up', ['shift']),
            'dec_start_time': Keys.newCombo('Down', ['shift']),
            'inc_end_time': Keys.newCombo('Up', ['ctrl']),
            'dec_end_time': Keys.newCombo('Down', ['ctrl']),
            'inc_row': Keys.newCombo('Up', ['alt']),
            'dec_row': Keys.newCombo('Down', ['alt'])
        };

        $scope.bindings = [
            {
                id: 'inc_start_time',
                label: 'Increment Start Time'
            },
            {
                id: 'dec_start_time',
                label: 'Decrement Start Time'
            },
            {
                id: 'inc_end_time',
                label: 'Increment End Time'
            },
            {
                id: 'dec_end_time',
                label: 'Decrement End Time'
            },
            {
                id: 'inc_row',
                label: 'Navigate Up One Row'
            },
            {
                id: 'dec_row',
                label: 'Navigate Down One Row'
            }
        ]

        function restoreDefault(binding) {
            binding.code = DEFAULT_BINDINGS[binding.id];
        }

        function restoreDefaults() {
            _.each($scope.bindings, restoreDefault);
        }

        // if no bindings are saved, use defaults
        if ($scope.bindings[0].code == null) {
            restoreDefaults();
            //save();
        }

        $scope.status = {
            message: null,
            type: null
        };

        // $scope.status.message = 'test';
        // $scope.status.type = STATUS_ERROR;

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

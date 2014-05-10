
var $ = require('jquery');
var _ = require('lodash');
var Keys = require('./keys/keys');

var CLASS_ERROR = 'status_error';
var CLASS_SUCCESS = 'status_success';

// Default bindings
var DEFAULT_BINDINGS = {
    'inc_start_time': Keys.newCombo('Up',   ['shift']),
    'dec_start_time': Keys.newCombo('Down', ['shift']),
    'inc_end_time':   Keys.newCombo('Up',   ['ctrl']),
    'dec_end_time':   Keys.newCombo('Down', ['ctrl']),
    'inc_row':        Keys.newCombo('Up',   ['alt']),
    'dec_row':        Keys.newCombo('Down', ['alt'])
};

var Bindings = _.clone(DEFAULT_BINDINGS);

// Notifications
var $status = $('#status');
function success(message) {
    $status.removeClass(CLASS_ERROR)
        .addClass(CLASS_SUCCESS)
        .html(message)
        .fadeIn('fast').delay(1000).fadeOut('fast');
}
function error(message) {
    $status.removeClass(CLASS_SUCCESS)
        .addClass(CLASS_ERROR)
        .html(message)
        .fadeIn('fast').delay(1000).fadeOut('fast');
}

// Bindings
function saveBinding(combo, name) {
    localStorage[name] = Keys.getComboString(combo);
}

function restoreBinding(combo, name) {
    var comboString = localStorage[name];
    if (comboString) {
        Bindings[name] = Keys.comboFromString(comboString);
    }
}

function displayBinding(combo, name) {
    var $input = $('#' + name);
    $input.val(Keys.getComboString(combo));
}

function onSubmit(e) {
    e.preventDefault();
    save();
}

function onReset(e) {
    e.preventDefault();
    reset();
}

function onKeydown(e) {
    // Get the current key combo
    var combo = Keys.getComboForEvent(e);

    // On ESC or BACKSPACE, clear the input
    if (combo.keyCode === Keys.Esc || combo.keyCode === Keys.Backspace) {
        $(this).val('');
        // Allow normal tab behavior
    } else if (combo.keyCode === Keys.Tab) {
        return;
    // Otherwise, bind the current key combination
    } else {
        // Update current keybinding
        Bindings[$(this).attr('name')] = combo;
        // Display new binding
        $(this).val(Keys.getComboString(combo));
    }
    return false;
}

// Saves options to localStorage.
function save() {
    // Update stored options
    _.each(Bindings, saveBinding);
    success('Options Saved.');
}

// Restores options from localStorage
function restore() {
    _.each(Bindings, restoreBinding);
    // Display keybindings
    show();
}

function show() {
    _.each(Bindings, displayBinding);
}

// Resets the options to the defaults
function reset() {
    Bindings = _.clone(DEFAULT_BINDINGS);
    save();
    show();
}

// On load, restore options if they were previously stored
restore();

// When form is submitted, save options
$('form').on('submit', onSubmit);
$('form').on('reset', onReset);

// Wire up keybind input fields
$('input[data-keybinder]').on('keydown', onKeydown);

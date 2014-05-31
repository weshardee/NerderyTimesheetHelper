define(function(require, exports, module) { // jshint ignore:line

    var codes = require('json!codes');

    var Keys = {};

    // Get the name for the keycode provided
    Keys.getNameFor = function(which) {
        for (key in codes) {
            if (which === codes[key]) {
                return key;
            }
        }

        return null;
    }

    // Get the keycode for the name provided
    Keys.getCodeFor = function(key) {
        return codes[key];
    }

    /* Determine if the provided key was pressed
     * key: The expected key (can be either a keycode or the letter)
     * which: The keyCode (from e.which) of the currently pressed key
     */
    Keys.isKeyPressed = function(key, which) {
        var self = this;
        if (typeof key === 'string') {
            return which === this.getCodeFor(key);
        } else if (typeof key === 'number') {
            return which === key;
        } else if (key && key.constructor.name === 'Array') {
            // Map each key to it's keyCode, and check for the presence of `which`
            return key.map(function(k) {
                if (typeof k === 'string') return self.getCodeFor(k);
                else return k;
            }).indexOf(which) > -1;
        } else {
            // Not a number or string? Not a valid keycode
            return false;
        }
    }

    // Determine if the provided combo was pressed
    Keys.isComboPressed = function(combo, binding) {
        if (!combo || !binding) return false;

        // If the key itself is the same, we just have to ensure the expected meta key is pressed
        if (binding.keyCode !== combo.keyCode) return false;
        if (binding.shift && !combo.shift) return false;
        if (binding.alt && !combo.alt) return false;
        if (binding.ctrl && !combo.ctrl) return false;
        if (binding.meta && !combo.meta) return false;
        else return true;
    }

    // Return true if the provided key is a meta key
    Keys.isKeyMeta = function(keyCode) {
        switch (keyCode) {
            case this.CTRL:
            case this.SHIFT:
            case this.ALT:
            case this.META:
            case this.META_RIGHT:
                return true;
            default:
                return false;
        }
    }

    // Return an empty combo object
    Keys.getEmptyCombo = function() {
        return {
            shift:   false,
            alt:     false,
            meta:    false,
            ctrl:    false,
            keyCode: 0,
        };
    }

    // Given a keypress event, get the keycombo it contains
    Keys.getComboForEvent = function(e) {
        var combo = this.getEmptyCombo();
        combo.shift   = e.shiftKey || false;
        combo.alt     = e.altKey   || false;
        combo.meta    = e.metaKey  || false;
        combo.ctrl    = e.ctrlKey  || false;
        combo.keyCode = e.which    || 0;
        return combo;
    }

    // Create a new key combination
    Keys.newCombo = function(keyCode, meta) {
        console.log('test');
        var combo = Keys.getEmptyCombo();
        meta = meta || [];
        if (typeof keyCode === 'string')
            combo.keyCode = this.getCodeFor(keyCode);
        else
            combo.keyCode = keyCode || 0;

        combo.shift   = meta.indexOf('shift') > -1
        combo.ctrl    = meta.indexOf('ctrl') > -1
        combo.alt     = meta.indexOf('alt') > -1
        combo.meta    = meta.indexOf('meta') > -1
        return combo;
    }

    // Pretty print the provided combo
    Keys.getComboString = function(combo) {
        var meta = (combo.ctrl  ? 'CTRL+'  : '') +
                   (combo.alt   ? 'ALT+'   : '') +
                   (combo.shift ? 'SHIFT+' : '') +
                   (combo.meta  ? 'META+'  : '');
        return meta + (this.getNameFor(combo.keyCode) || '');
    }

    // Reverse of getComboString, you should get the original combo if you call comboFromString(getComboString)
    Keys.comboFromString = function(str) {
        var parts     = str.split('+');
        var combo     = this.getEmptyCombo();
        combo.keyCode = this.getCodeFor(parts[parts.length - 1]);
        combo.ctrl    = parts.indexOf('CTRL') > -1;
        combo.alt     = parts.indexOf('ALT') > -1;
        combo.shift   = parts.indexOf('SHIFT') > -1;
        combo.meta    = parts.indexOf('META') > -1;
        return combo;
    }

    // Check if a key combo requires the presence of the provided key
    Keys.requiredBy = function(keyCode, combo) {
        if (combo.keyCode === keyCode)
            return true;
        else if (combo.ctrl && keyCode === this.CTRL)
            return true;
        else if (combo.shift && keyCode === this.SHIFT)
            return true;
        else if (combo.alt && keyCode === this.ALT)
            return true;
        else if (combo.meta && (keyCode === this.META || keyCode === this.META_RIGHT))
            return true;
        else return false;
    }

    // Check to see if the provided combo satisfies all the meta requirements for the provided binding combo
    Keys.metaSatisfied = function(currentCombo, binding) {
        if (binding.ctrl && !currentCombo.ctrl)
            return false;
        else if (binding.shift && !currentCombo.shift)
            return false;
        else if (binding.alt && !currentCombo.alt)
            return false;
        else if (binding.meta && !currentCombo.meta)
            return false;
        else return true;
    }

    module.exports = Keys;
});

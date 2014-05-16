var TimeManager = {
    getTimeFromElement: function($el) {
        var time = $el.val() || moment().format('h:mm A');
        return moment(time, 'h:mm A');
    },
    increase: function ($element, interval) {
        var time = $element.val() || moment().format('h:mm A');
        var increased = moment(time, 'h:mm A').add('minutes', interval || 15);
        $element.val(increased.format('h:mm A'));
    },
    decrease: function ($element, interval) {
        var time = $element.val() || moment().format('h:mm A');
        var decreased = moment(time, 'h:mm A').subtract('minutes', interval || 15);
        $element.val(decreased.format('h:mm A'));
    },
    getNextTime: function(relativeFrom) {
        if (relativeFrom) {
            return relativeFrom.clone().add('minutes', 15);
        } else {
            var now = moment();
            return moment().add('minutes', 15 - (now.minutes() % 15));
        }
    },
    getNearestTime: function() {
        var now = moment();
        var diff = now.minutes() % 15;
        // If no difference, then we are already at the nearest quarter hour
        if (diff === 0) return now;
        // If the difference is greater than half of the interval, go to the next 15 minute mark
        else if (diff > 7.5) return now.add('minutes', 15 - (now.minutes() % 15));
        // If the difference is less than half of the interval, go back to the most recent 15 minute mark
        else return now.subtract('minutes', now.minutes() % 15);
    },
    shiftTimes: function (startTime, endTime) {
        // If start/end times are provided, use them
        // Otherwise, use the currently selected start time, or
        // the nearest time block from now as a final fallback
        if (startTime === undefined) {
            var start  = app.elements.$startTime.val();
            startTime  = start ? moment(start, 'h:mm A') : getNearestTime();
        }
        if (endTime === undefined) {
            // Get the current selected end time, or use the next time in it's place
            var end = app.elements.$endTime.val();
            endTime = end ? moment(end, 'h:mm A') : getNextTime();
        }
        // Calculate the difference between the start and end
        var diffInMin  = endTime.diff(startTime, 'minutes');
        var shiftedEnd = endTime.clone().add('minutes', diffInMin);
        // Set the shifted values
        app.elements.$startTime.val(endTime.format('h:mm A'));
        app.elements.$endTime.val(shiftedEnd.format('h:mm A'));
        // Update the time remaining
        var $timeRemaining    = $('#orig_time_remaining');
        var origTimeRemaining = parseFloat($timeRemaining.val());
        var duration          = moment.duration(origTimeRemaining * 60 - diffInMin, 'minutes');
        var hours             = duration.hours();
        var hourFraction      = parseFloat((duration.minutes() / 60).toPrecision(2));
        var totalDiff         = hours + hourFraction;
        // Calculate the new time remaining
        var newTimeRemaining  = origTimeRemaining - totalDiff;
        $timeRemaining.val(newTimeRemaining);
        app.updateRemainingTime();
    }
};

module.exports = TimeManager;

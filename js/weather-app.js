jQuery(document).ready(function ($) {
    $.ajax({
        url: "http://api.wunderground.com/api/96f231c8d2cbcc08/geolookup/conditions/q/ID/Rexburg.json",
        //        url: "../js/weather.json",
        dataType: "json",
        success: function (parsed_json) {
            console.log(parsed_json);
            var location = data['Springfield']['City'];
            var state = data['Springfield']['State'];
            var temp_f = data['Springfield']['High'];
        }
    });
});

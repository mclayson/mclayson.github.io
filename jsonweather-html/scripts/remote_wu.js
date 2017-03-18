// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({

            url: "//api.wunderground.com/api/96f231c8d2cbcc08/conditions/q/" + lat + "," + long + ".json",
            //        url: "../js/weather.json",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);


                //                cityDisplay
                $("#cityDisplay").text(data.current_observation.display_location.full);

                //                summary
                $("#summary").text(data.current_observation.weather);

                //                add1-3
                $("#currentTemp").text(data.current_observation.temp_f + String.fromCharCode(176) + "f");
                $("#add1").text(data.current_observation.wind_string);
                $("#add2").text("Feels like " + data.current_observation.feelslike_string);
                $("#add3").text("Relative humidity " + data.current_observation.relative_humidity);
                $("#weather-image").attr("src", data.current_observation.icon_url);


                $("#cover").fadeOut(250);
            }
        });

    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});

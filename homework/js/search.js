// Current Location Scripts
$(function () {

    var info = $('#weather-info');
    var searchResults = $('#searchResults');
    var dataList = $('#searchResultsDisplay');
    info.fadeOut();

    // Get the data from the wunderground API
    getResults = function (lat, long) {
        $.ajax({

            url: "//api.wunderground.com/api/96f231c8d2cbcc08/conditions/q/" + lat + "," + long + ".json",
            //        url: "../js/weather.json",
            dataType: "jsonp",
            success: function (data) {
                console.log(data);

                info.fadeIn();
                searchResults.fadeOut();

                //                cityDisplay
                $("#cityDisplay").text(data.current_observation.display_location.full);

                //                summary
                $("#summary").text(data.current_observation.weather);

                //                add1-3
                $("#currentTemp").text(data.current_observation.temp_f + String.fromCharCode(176) + "f");
                $("#wind").text(data.current_observation.wind_string);
                $("#wind").text(data.current_observation.wind_string);
                $("#wind").text(data.current_observation.wind_string);
                $("#feels").text(data.current_observation.feelslike_string);
                $("#precipitation").text(data.current_observation.relative_humidity);
                $("#weather-img").attr("src", data.current_observation.icon_url);

            }
        });

    }


    $('#query').keyup(function () {
        info.fadeOut();
        searchResults.fadeIn();
        var value = $('#query').val();
        var rExp = new RegExp(value, "i");
        $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
            console.log(data); // test for JSON received
            // Begin building output
            var output = '<ul>';
            $.each(data.RESULTS, function (key, val) {
                if (val.name.search(rExp) != -1) {
                    output += '<li>';
                    output += '<a data-lat="' + val.lat + '" data-lon="' + val.lon + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                    output += '</li>';
                }
            }); // end each
            output += '</ul>';
            dataList.html(output); // send results to the page

            $('#searchResultsDisplay').on('click', 'li', function (e) {
                getResults(e.target.getAttribute('data-lat'), e.target.getAttribute('data-lon'));
            });


        }); // end getJSON
    }); // end keyup
});

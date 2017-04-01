// Current Location Scripts
$(function () {

    var content = $('#content');

    // Get the data from the wunderground API
    //    getContent = function () {
    $.ajax({

        url: "./js/food.json",
        //        url: "../js/weather.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var output = '<ul>';
            $.each(data.menu, function (key, val) {
                output += '<li>';
output += '<h3>' + val.displayName + '</h3>';
output += '<p>' + val.description + '</p>';
output += '</li>';
            }); // end each
            output += '</ul>';
            content.html(output); // send results to the page
        }
    });

    //    }
});

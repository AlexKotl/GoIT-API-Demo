

var api = (function() {
    var data = [];
    var movies_list = ['Man', 'Army', '3.14', 'Lady', 'Cat', 'Dog', 'Bin'];


    return {
        getJson: function () {
            var xhr = new XMLHttpRequest();
            data = [];

            movies_list.forEach(function (title) {
                xhr.open('GET', 'http://www.omdbapi.com/?t=' + encodeURI(title) + '&y=&plot=long&r=json', false);
                xhr.send();

                if (xhr.status != 200) {
                    console.log(xhr.status + ': ' + xhr.statusText);
                } else {
                    try {
                        var parsed = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        console.log('Cannot retrieve data: ' + e);
                    }
                    finally {
                        data.push(parsed);
                    }

                }

            });

            return data;

        }
    }
})();

var data = api.getJson();
var table = document.getElementById('movies_data');

data.forEach(function(el) {
    var tr = document.createElement('tr');
    tr.innerHTML =
        "<td><img src='" + el.Poster + "' width='100'></td>"
        + "<td>" + el.Year + "</td>"
        + "<td>" + el.Title + "</td>"
        + "<td>" + el.Country + "</td>"
        + "<td>" + el.imdbRating + "</td>";
    table.appendChild(tr);
});
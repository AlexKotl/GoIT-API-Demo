

var api = (function(table_el) {
    var data = [];
    var table = table_el;
    var movies_list = ['Man', 'Army', '3.14', 'Lady', 'Cat', 'Dog', 'Bin'];

    return {
        init: function() {
            this.getJson();
            this.attachSorter();
            this.render();

            return this;
        },

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

            return this;

        },

        onSort: function(e) {
            console.log('sorting...' + e);

            data.sort(function(a, b) {

            });

            this.render();

            return this;
        },

        render: function() {
            table.getElementsByTagName('tbody')[0].innerHTML = '';
            
            data.forEach(function(el) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    "<td><img src='" + el.Poster + "' width='100'></td>"
                    + "<td>" + el.Year + "</td>"
                    + "<td><b>" + el.Title + "</b></td>"
                    + "<td>" + el.Country + "</td>"
                    + "<td>" + el.imdbRating + "</td>";
                table.appendChild(tr);
            });

            return this;
        },

        attachSorter: function() {
            console.log(table.getElementsByTagName('thead')[0].getElementsByTagName('td'));
            var tds = table.getElementsByTagName('thead')[0].getElementsByTagName('td');
            for (var i=0; i<tds.length; i++) {
                tds[i].addEventListener('click', this.onSort);
            }

            return this;
        }
    }
})(document.getElementById('movies_table'));

api.init();


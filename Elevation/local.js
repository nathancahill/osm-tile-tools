
function markersFromCookies (map) {
    var cookies= readCookies ("marker");

    for (var i= 0; i<cookies.length; i++) {
        var cookie= cookies[i];

        var data= cookie.split (',');
        // it's lat,lon,text,url
        var marker= L.marker([data[0], data[1]]).addTo (map);
        // reconstruct the url in case it got split
        // var url= .join (',')
        if (data[3].length>0) {
            marker.bindPopup ('<a href="'+data[3]+'">'+data[2]+'</a>').openPopup ();
        } else {
            marker.bindPopup (data[2]).openPopup ();
        }
    }
}

function setup_map () {
    var map = L.map('map').setView([47.946,10.195], 5);

    L.tileLayer('http://grulicueva.homenet.org/~mdione/Elevation/{z}/{x}/{y}.png', {
        attribution: 'Map data (C) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);

    var hash = new L.Hash(map);

    // markersFromCookies (map);

    var geocoder = L.Control.geocoder({
        collapsed: false,
        showResultIcons: true
    });
    geocoder.addTo(map);
    geocoder.markGeocode = function(result) {
        this._map.fitBounds(result.bbox);
        return this;
    };

    // trip planner
    var trip= new Trip ('default');
    var planner= new TripManager (map, trip);
}

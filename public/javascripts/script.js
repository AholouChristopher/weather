
var mymap = L.map('worldmap',{
  center: [48.866667, 2.333333],
  zoom: 4,
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
 {foo: 'bar',
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }).addTo(mymap);

  var cities = document.getElementsByClassName('list-group-item');


  for(var i=0; i<cities.length; i++)
  {
    var lat = cities[i].dataset.lat;
    var lon = cities[i].dataset.lon;
    var nameCity = cities[i].dataset.namecity;

    L.marker([lat, lon]).addTo(mymap).bindPopup(nameCity)
  }

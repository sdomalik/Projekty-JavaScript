
//getts current geolocalization and writes to variables
function getLocation(onlocationready) {
  let geo = navigator.geolocation;
  if (geo) {
    geo.getCurrentPosition(function (location) {
      let lat = location.coords.latitude
      let lng = location.coords.longitude

      onlocationready({
        lat: lat,
        lng: lng
      })
    })
  }
  else {
    console.log('niedostepny')
  }
}

//seting new position of marker and center of map 
function moveMarker(marker, map, offsetX, offsetY) {
  let currentX = marker.position.lat()
  let currentY = marker.position.lng()

  let newPosition = new google.maps.LatLng(currentX + offsetX, currentY + offsetY)
  marker.setPosition(newPosition)

  let newCenter = new google.maps.LatLng(
    map.center.lat() + offsetX,
    map.center.lng() + offsetY
  )
  map.setCenter(newCenter)
}


//function display map in current position
function initMap() {
  getLocation(function (locationData) {
    let map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 13,
        center: locationData,
        gestureHandling: 'none',
        zoomControl: false,
        streetViewControl: false,
        keyboardShortcuts: false
      });

    //add marker in the center of map
    let marker = new google.maps.Marker({
      position:
        locationData,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        strokeColor: 'purple'
      }
    });

    //changing position of marker when keydown
    window.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37:
          moveMarker(marker, map, 0, -0.003)
          console.log("lewa");
          break;
        case 38:
          moveMarker(marker, map, 0.003, 0)
          console.log("góra");
          break;
        case 40:
          moveMarker(marker, map, -0.003, 0)
          console.log("dół");
          break;
        case 39:
          moveMarker(marker, map, 0, 0.003)
          console.log("prawa");
          break;
      }
    })
  })

}







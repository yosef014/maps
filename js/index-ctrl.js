


function renderPlasces() {

    var strHtml = ''
    var places = getgMrakedPlaces()
    console.log('places', places);
    gMrakedPlaces.forEach(place => {
        strHtml += ` <a href="#" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1" >${place.placeName}</h5>
          <p>📌</p>
          <small onclick="onXclicked(${place.id})">X</small>
        </div>
        
        </a>`
        addMarker(place.lat, place.lng, place.placeName)
    });
    document.querySelector('.list-group').innerHTML = strHtml

}

function init() {
    initMap(29.55805, 34.94821);
    renderPlasces()
}

function initMap(lat = 32.0749831, lng = 32.0749831) {
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 11
    };

    gMap = new google.maps.Map(
        elMap,
        options
    );
    addMarker(lat, lng)
    // renderPlasces()
    google.maps.event.addListener(gMap, 'click',
        function (event) {
            document.querySelector('.lat-span').innerText = event.latLng.lat()
            document.querySelector('.lng-span').innerText = event.latLng.lng()
            var ask = confirm("save this loaction?");
            if (!ask) return
            var placeName = prompt('enter placr name pls')
            addMarker(event.latLng.lat(), event.latLng.lng(), placeName)
            gMrakedPlaces.push(creatPlace( placeName,event.latLng.lat(), event.latLng.lng()))
            saveToStorage(STORAGE_KEY, gMrakedPlaces)
            renderPlasces()

        }


    )


}
function showLocation(position) {
    var date = new Date(position.timestamp);
    initMap(position.coords.latitude, position.coords.longitude);
}



function handleLocationError(error) {
    // var locationError = document.getElementById("locationError");

    // switch (error.code) {
    //     case 0:
    //         locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
    //         break;
    //     case 1:
    //         locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
    //         break;
    //     case 2:
    //         locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
    //         break;
    //     case 3:
    //         locationError.innerHTML = "The browser timed out before retrieving the location.";
    //         break;
    // }
}

function onMyLocationClicked() {
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);


}

function onXclicked(id){
var places = getgMrakedPlaces()
var placeIdx= places.findIndex( place => place.id ==id)
gMrakedPlaces.splice(placeIdx,1)
saveToStorage(STORAGE_KEY, gMrakedPlaces)
renderPlasces()


}

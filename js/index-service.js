const STORAGE_KEY = 'placesDB'
var gMap
var gMrakedPlaces = creatPlaces()

function getgMrakedPlaces() {
    return gMrakedPlaces
}
function creatPlace(placeName, lat, lng) {
    return {
        id: getRandomIntInclusive(0, 9999),
        placeName: placeName,
        lat: lat,
        lng: lng
    }


}

function creatPlaces() {
    var places = loadFromStorage(STORAGE_KEY)
    if (!places || !places.length) {

        var NewPlaces = [
            creatPlace('משטרת ישראל', 31.99179644211562, 34.78491942135163),
            creatPlace('קניון הגדול קניותר', 32.99179644211562, 34.78491942135163),
            creatPlace('הבית של סבתא', 33.99179644211562, 34.78491942135163),
        ]
        places = NewPlaces

    }
    gMrakedPlaces = places
    saveToStorage(STORAGE_KEY, gMrakedPlaces)
    return places
}
function addMarker(lat, lng, placeName) {

    new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: placeName,
        animation: google.maps.Animation.DROP

    });
  
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
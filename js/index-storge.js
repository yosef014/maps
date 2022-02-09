function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}


function deleteFromStorage(id) {
    const Places = getgMrakedPlaces()
    var PlaceIndx = Places.findIndex(Place => Place.id === id)
    Places.splice(PlaceIndx, 1);
    saveToStorage(STORAGE_KEY, Places)
}
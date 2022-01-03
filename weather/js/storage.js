const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];

function addToFavorites(item) {
    favoriteCities.push(item);
    saveFavoriteCities(favoriteCities);
}

function deleteFromStorage(city) {
    const filtredCities = favoriteCities.filter(item => item != city);
    saveFavoriteCities(filtredCities);
}

function saveFavoriteCities(favoriteCities) {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
}

export { addToFavorites, deleteFromStorage, saveFavoriteCities, favoriteCities };
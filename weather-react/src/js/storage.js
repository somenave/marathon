const favoriteCities = new Set(JSON.parse(localStorage.getItem('favoriteCities'))) ?? new Set();

function addToFavorites(item) {
  favoriteCities.add(item);
  saveFavoriteCities([...favoriteCities]);
}

function deleteFromStorage(city) {
  favoriteCities.delete(city);
  saveFavoriteCities([...favoriteCities]);
}

function saveFavoriteCities(favoriteCities) {
  localStorage.setItem('favoriteCities', JSON.stringify([...favoriteCities]));
}

export { addToFavorites, deleteFromStorage, favoriteCities };
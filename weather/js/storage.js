export function setCookie(name, value, options = {}) {
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (const optionKey in options) {
        updatedCookie += '; ' + optionKey;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

const favoriteCities = new Set(JSON.parse(localStorage.getItem('favoriteCities'))) || new Set();

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

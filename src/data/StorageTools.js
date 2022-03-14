const FAVORITES_DRINKS_STORAGE = "favDrinks";
const CONSUMED_DRINKS_STORAGE = "consumedDrinks";
const API_CACHE_STORAGE = "apiCache";

export default class StorageTools {
    static initCheckFavoritesDrinks() {
        let favoritesDrinks;
        try {
            favoritesDrinks = JSON.parse(localStorage.getItem(FAVORITES_DRINKS_STORAGE));
            if (!Array.isArray(favoritesDrinks)) {
                throw new TypeError();
            }
        } catch {
            favoritesDrinks = [];
            localStorage.setItem(FAVORITES_DRINKS_STORAGE, JSON.stringify(favoritesDrinks));
        }
        return favoritesDrinks;
    }

    static addFavoriteDrink(drinkID) {
        if (!StorageTools.containsFavoriteDrink(drinkID)) {
            const favoritesDrinks = StorageTools.initCheckFavoritesDrinks();
            favoritesDrinks.push(drinkID);
            localStorage.setItem(FAVORITES_DRINKS_STORAGE, JSON.stringify(favoritesDrinks));
        }
    }

    static removeFavoriteDrink(drinkID) {
        if (StorageTools.containsFavoriteDrink(drinkID)) {
            const favoritesDrinks = StorageTools.initCheckFavoritesDrinks().filter(id => drinkID !== id);
            localStorage.setItem(FAVORITES_DRINKS_STORAGE, JSON.stringify(favoritesDrinks));
        }
    }

    static containsFavoriteDrink(drinkID) {
        return StorageTools.initCheckFavoritesDrinks().includes(drinkID);
    }
    
    static initCheckConsumedDrinks() {
        let consumedDrinks;
        try {
            consumedDrinks = JSON.parse(localStorage.getItem(CONSUMED_DRINKS_STORAGE));
            if (!Array.isArray(consumedDrinks)) {
                throw new TypeError();
            }
        } catch {
            consumedDrinks = [];
            localStorage.setItem(CONSUMED_DRINKS_STORAGE, JSON.stringify(consumedDrinks));
        }
        return consumedDrinks;
    }

    static addConsumedDrink(drinkID) {
        if (!StorageTools.containsConsumedDrink(drinkID)) {
            const consumedDrinks = StorageTools.initCheckConsumedDrinks();
            consumedDrinks.push(drinkID);
            localStorage.setItem(CONSUMED_DRINKS_STORAGE, JSON.stringify(consumedDrinks));
        }
    }

    static removeConsumedDrink(drinkID) {
        if (StorageTools.containsConsumedDrink(drinkID)) {
            const consumedDrinks = StorageTools.initCheckConsumedDrinks().filter(id => drinkID !== id);
            localStorage.setItem(CONSUMED_DRINKS_STORAGE, JSON.stringify(consumedDrinks));
        }
    }

    static containsConsumedDrink(drinkID) {
        return StorageTools.initCheckConsumedDrinks().includes(drinkID);
    }

    static initCheckApiCache() {
        let cache;
        try {
            cache = JSON.parse(localStorage.getItem(API_CACHE_STORAGE));
            if (typeof cache !== "object") {
                throw new TypeError();
            }
        } catch {
            cache = {};
            localStorage.setItem(API_CACHE_STORAGE, JSON.stringify(cache));
        }
        return cache;
    }

    static setApiCache(endpoint, endpointCache) {
        if (!StorageTools.containsApiCache(endpoint)) {
            const cache = StorageTools.initCheckApiCache();
            cache[endpoint] = endpointCache.json();
            localStorage.setItem(API_CACHE_STORAGE, JSON.stringify(cache));
        }
    }

    static containsApiCache(endpoint) {
        return StorageTools.initCheckApiCache().hasOwnProperty(endpoint);
    }
}
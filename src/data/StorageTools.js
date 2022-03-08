const FAVORITES_DRINKS_STORAGE = "favDrinks";
const CONSUMED_DRINKS_STORAGE = "consumedDrinks";

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
}
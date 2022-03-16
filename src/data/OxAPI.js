import Cache from './Cache';
import StorageTools from "./StorageTools";

const URL = "https://ox4me.herokuapp.com";

const cache = {};
for (let [endpoint, {data, timestamp}] of Object.entries(StorageTools.initCheckApiCache())) {
    if (Date.now() - timestamp <= Cache.DURATION) {
        cache[endpoint] = new Cache(data, timestamp);
    }
}

async function cacheEndpoint(endpoint) {
    if (!cache.hasOwnProperty(endpoint)) {
        cache[endpoint] = new Cache();
    }
    const data = await cache[endpoint].queryData(async () => {
        const response = await fetch(URL + endpoint);
        return await response.json();
    });
    StorageTools.setApiCache(endpoint, cache[endpoint]);
    return data;
}

export default class OxAPI {
    static async getAllDrinks() {
        return cacheEndpoint("/drink/all");
    }

    static async getDrinkDetails(drinkID) {
        return cacheEndpoint("/drink/get/" + encodeURIComponent(drinkID));
    }

    static async getRandomDrink(criterion="all") {
        const response = await fetch(URL + "/drink/random?criterion=" + encodeURIComponent(criterion));
        return await response.json();
    }

    static async searchDrinks(pattern) {
        return cacheEndpoint("/drink/search?pattern=" + encodeURIComponent(pattern));
    }

    static async drinkOfTheDay() {
        return cacheEndpoint("/drink/today");
    }

    static async getDrinksSuggestions(drinks) {
        return cacheEndpoint("/drink/suggestions?" + drinks.map(id => "drinks=" + encodeURIComponent(id)).join("&"));
    }
}
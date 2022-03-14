import Cache from './Cache';
import StorageTools from "./StorageTools";

const URL = "https://ox4me.herokuapp.com";

const cache = {};
for (let [endpoint, {data, timestamp}] of Object.entries(StorageTools.initCheckApiCache())) {
    if (Date.now() - timestamp <= Cache.DURATION) {
        cache[endpoint] = new Cache(data, timestamp);
    }
}

export default class OxAPI {
    static async getAllDrinks() {
        const endpoint = "/drink/all";
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

    static async getDrinkDetails(drinkID) {
        const endpoint = "/drink/get/" + encodeURIComponent(drinkID);
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

    static async getRandomDrink(criterion="all") {
        const response = await fetch(URL + "/drink/random?criterion=" + encodeURIComponent(criterion));
        return await response.json();
    }

    static async searchDrinks(pattern) {
        const endpoint = "/drink/search?pattern=" + encodeURIComponent(pattern);
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
}
const URL = "https://ox4me.herokuapp.com";

export default class OxAPI {
    static async getAllDrinks() {
        const response = await fetch(URL + "/drink/all");
        return await response.json();
    }

    static async getDrinkDetails(drinkID) {
        const response = await fetch(URL + "/drink/get/" + encodeURIComponent(drinkID));
        return await response.json();
    }

    // Waiting to be done
    // static async getRandomDrink() {
    //     const response = await fetch(URL + "/drink/random");
    //     return await response.json();
    // }

    static async searchDrinks(pattern) {
        const response = await fetch(URL + "/drink/search?pattern=" + encodeURIComponent(pattern));
        return await response.json();
    }
}
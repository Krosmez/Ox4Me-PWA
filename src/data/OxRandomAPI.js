const URL = "https://ox4me.herokuapp.com";

export default class OxRandomAPI {
    static async getAllDrinks() {
        const response = await fetch(URL + "/drink/all");
        return await response.json();
    }

    static async getRandomDrink() {
        const res = await fetch(URL + "/drink/all")
            .then(res => res.json());

        // Create empty array for results
        let results = [];
        // Make a randomiser on response fetched
        for (let i = res.drinks.length - 1; i > 0; i--) {
            const x = Math.round(Math.random() * i);

            const y = res.drinks[i];
            res.drinks[i] = res.drinks[x];
            res.drinks[x] = y;
        }
        // Enter randomised data in the empty array
        results.push(res.drinks[0]);
        return results[0].id;
    }

    static async getDrinkByCategory(category) {
        const res = await fetch(URL + "/drink/all")
            .then(res => res.json());
        const newRes = res.drinks.filter(e => e.category === category);

        let results = [];
        for (let i = newRes.length - 1; i > 0; i--) {
            const x = Math.round(Math.random() * i);

            const y = newRes[i];
            newRes[i] = newRes[x];
            newRes[x] = y;
        }
        // Enter randomised data in the empty array
        results.push(newRes[0]);
        return results[0].id;
    }

}
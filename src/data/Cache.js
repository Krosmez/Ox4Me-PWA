export default class Cache {
    static DURATION = 1000 * 60 * 60; // 1 hour

    constructor(data = null, timestamp = false) {
        this.data = data;
        this.timestamp = timestamp;
    }

    async queryData(fallback = async () => {}) {
        if (this.timestamp === false || Date.now() - this.timestamp > Cache.DURATION) {
            this.data = await fallback();
            this.timestamp = Date.now();
        }
        return this.data;
    }

    json() {
        return {
            "data": this.data,
            "timestamp": this.timestamp
        }
    }
}
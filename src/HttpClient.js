import axios from "axios";

class HttpClient {
    constructor(latitude, longitude) {
        this.API_KEY = process.env.REACT_APP_API_KEY;
        this.LATITUDE = latitude;
        this.LONGITUDE = longitude;
    }

    async getCurrentForecast() {
        return await axios.get(this.#getEndpoint('weather'));
    }

    async getFiveDayTemperatures() {
        return await axios.get(this.#getEndpoint('forecast'));
    }

    #getEndpoint(param) {
        return `https://api.openweathermap.org/data/2.5/${param}?lat=${this.LATITUDE}&lon=${this.LONGITUDE}&appid=${this.API_KEY}`
    }
}

export default HttpClient;
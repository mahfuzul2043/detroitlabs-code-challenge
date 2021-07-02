import axios from "axios";

/**
 * This HttpClient is responsible for requesting data from the openweathermap API
 */
class HttpClient {
    constructor(latitude, longitude) {
        this.API_KEY = process.env.REACT_APP_API_KEY;
        this.LATITUDE = latitude;
        this.LONGITUDE = longitude;
    }

    /**
     * Gets current forecast data
     * @returns Current forecast data
     */
    async getCurrentForecast() {
        return await axios.get(this.#getEndpoint('weather'));
    }

    /**
     * Gets 5 day temperature data
     * @returns Five day temperature data
     */
    async getFiveDayTemperatures() {
        return await axios.get(this.#getEndpoint('forecast'));
    }

    #getEndpoint(param) {
        return `https://api.openweathermap.org/data/2.5/${param}?lat=${this.LATITUDE}&lon=${this.LONGITUDE}&appid=${this.API_KEY}&units=imperial`
    }
}

export default HttpClient;
import { useEffect, useState } from "react";
import HttpClient from "../HttpClient";

function CurrentForecast({ locationObj }) {
    const getCurrentForecastObj = (success, data) => ({ success, data });

    const httpClient = new HttpClient(locationObj.location.coords.latitude, locationObj.location.coords.longitude);
    const [currentForecast, setCurrentForecast] = useState(getCurrentForecastObj(null, null));

    useEffect(() => {
        const getCurrentForecast = async () => {
            try {
                const response = await httpClient.getCurrentForecast();
                setCurrentForecast(getCurrentForecastObj(true, response.data));
            } catch (e) {
                alert(e);
                setCurrentForecast(getCurrentForecastObj(false, null));
            }
        }

        getCurrentForecast();

        // eslint-disable-next-line
    }, []);

    return (
        <main>
            {currentForecast.success === null && 'Loading...'}
            {currentForecast.success === true && (
                `The temperature is ${currentForecast.data.main.temp} degrees fahrenheit at ${currentForecast.data.name}`
            )}
        </main>
    )
}

export default CurrentForecast;
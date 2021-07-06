import { useEffect, useState } from "react";
import { createHttpObj } from "../Helpers";
import HttpClient from "../HttpClient";

function CurrentForecast({ locationObj }) {
    const [currentForecast, setCurrentForecast] = useState(createHttpObj(null, null));

    useEffect(() => {
        /**
         * Http call to get current forecast
         */
        const getCurrentForecast = async () => {
            const httpClient = new HttpClient(locationObj.location.coords.latitude, locationObj.location.coords.longitude);

            try {
                const response = await httpClient.getCurrentForecast();
                setCurrentForecast(createHttpObj(true, response.data));
            } catch (e) {
                alert(e);
                setCurrentForecast(createHttpObj(false, null));
            }
        }

        getCurrentForecast();
    }, [locationObj]);

    return (
        <main>
            {currentForecast.success === null && <span data-testid='loading-currentforecast-element'>Loading...</span>}
            {currentForecast.success === true && (
                <span data-testid='temperature-display-element'>{`The temperature is ${currentForecast.data.main.temp} degrees fahrenheit at ${currentForecast.data.name}`}</span>
            )}
        </main>
    )
}

export default CurrentForecast;
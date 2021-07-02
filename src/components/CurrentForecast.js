import { useEffect, useState } from "react";
import { getHttpObj } from "../Helpers";
import HttpClient from "../HttpClient";

function CurrentForecast({ locationObj }) {
    const httpClient = new HttpClient(locationObj.location.coords.latitude, locationObj.location.coords.longitude);
    const [currentForecast, setCurrentForecast] = useState(getHttpObj(null, null));

    useEffect(() => {
        const getCurrentForecast = async () => {
            try {
                const response = await httpClient.getCurrentForecast();
                setCurrentForecast(getHttpObj(true, response.data));
            } catch (e) {
                alert(e);
                setCurrentForecast(getHttpObj(false, null));
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
import { useEffect, useState } from "react";
import { createHttpObj } from "../Helpers";
import HttpClient from "../HttpClient";

function FiveDayTemps({ locationObj }) {
    const [fiveDayTemps, setFiveDayTemps] = useState(createHttpObj(null, null));

    useEffect(() => {
        /**
         * Http call to the openweathermap API to retrieve five day temp data
         */
        const getFiveDayTemps = async () => {
            const httpClient = new HttpClient(locationObj.location.coords.latitude, locationObj.location.coords.longitude);

            try {
                const response = await httpClient.getFiveDayTemperatures();

                // since the data returned by the API is not grouped by day, we need to do that client-side. 
                // the following logic implements a grouping of weather data by day for the 5 days returned.
                let responseCpy = { ...response.data };

                const tempsByDay = response.data.list.reduce((acc, value) => {
                    const date = value.dt_txt.substring(0, 10);

                    if (!acc[date]) {
                        acc[date] = [];
                    }

                    acc[date].push(value);

                    return acc;
                }, {});

                responseCpy.list = tempsByDay;
                
                setFiveDayTemps(createHttpObj(true, responseCpy));
            } catch (e) {
                alert(e);
                setFiveDayTemps(createHttpObj(false, null));
            }
        }

        getFiveDayTemps();
    }, [locationObj]);

    /**
     * Render hourly weather data
     * @param {object} obj The hourly weather object
     * @returns React component rendering hourly weather data
     */
    const mapHours = obj => {
        const weatherDetails = obj.weather[0];
        return (
            <div key={obj.dt} className='weather-dropdown' data-testid='weather-row-element'>
                <img src={`http://openweathermap.org/img/wn/${weatherDetails.icon}.png`} alt={weatherDetails.main} /> | {obj.dt_txt} | {obj.main.temp} degrees fahrenheit | {weatherDetails.description}
                <br />
                <br />
            </div>
        )
    }

    /**
     * Render weather accordions
     * @param {string} key The object key
     * @returns React component rendering weather accordions
     */
    const mapDays = key => {
        return (
            <details key={key} data-testid='accordion-element'>
                <summary>
                    {key}
                </summary>
                {fiveDayTemps.data.list[key].map(mapHours)}
            </details>
        )
    }

    return (
        <main>
            {fiveDayTemps.success === null && <span data-testid='loading-5daytemps-element'>Loading...</span>}
            {fiveDayTemps.success === true && (
                <div className='five-day-temps-wrapper'>
                    {Object.keys(fiveDayTemps.data.list).map(mapDays)}
                </div>
            )}
        </main>
    )
}

export default FiveDayTemps;
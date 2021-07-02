import { useEffect, useState } from "react";
import { getHttpObj } from "../Helpers";
import HttpClient from "../HttpClient";

function FiveDayTemps({ locationObj }) {
    const httpClient = new HttpClient(locationObj.location.coords.latitude, locationObj.location.coords.longitude);
    const [fiveDayTemps, setFiveDayTemps] = useState(getHttpObj(null, null));

    useEffect(() => {
        /**
         * Http call to the openweathermap API to retrieve five day temp data
         */
        const getFiveDayTemps = async () => {
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
                
                setFiveDayTemps(getHttpObj(true, responseCpy));
            } catch (e) {
                alert(e);
                setFiveDayTemps(getHttpObj(false, null));
            }
        }

        getFiveDayTemps();
        // eslint-disable-next-line
    }, []);

    /**
     * Render hourly weather data
     * @param {object} obj The hourly weather object
     * @returns React component rendering hourly weather data
     */
    const mapHours = obj => {
        const weatherDetails = obj.weather[0];
        return (
            <div key={obj.dt} className='weather-dropdown'>
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
            <details key={key}>
                <summary>
                    {key}
                </summary>
                {fiveDayTemps.data.list[key].map(mapHours)}
            </details>
        )
    }

    return (
        <main>
            {fiveDayTemps.success === null && 'Loading...'}
            {fiveDayTemps.success === true && (
                <div className='five-day-temps-wrapper'>
                    {Object.keys(fiveDayTemps.data.list).map(mapDays)}
                </div>
            )}
        </main>
    )
}

export default FiveDayTemps;
import { render, screen, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import FiveDayTemps from "../components/FiveDayTemps";
import fivedaytempsMockData from "../mock_http_responses/fivedaytemps";

it('Should load 6 accordions populated with 40 rows of weather data', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: fivedaytempsMockData });
    const mockPropsData = { 
        location: {
            coords: {
                longitude: 0,
                latitude: 0
            }
        }
    };

    window.alert = () => {};

    render(<FiveDayTemps locationObj={mockPropsData} />);
    expect(screen.getByTestId('loading-5daytemps-element')).toHaveTextContent('Loading...');

    const accordions = await waitFor(() => screen.getAllByTestId('accordion-element'));
    const rows = await waitFor(() => screen.getAllByTestId('weather-row-element'));

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(accordions.length).toEqual(6);
    expect(rows.length).toEqual(40);
});
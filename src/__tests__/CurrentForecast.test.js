import { render, screen, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import CurrentForecast from "../components/CurrentForecast";
import currentforecastMockData from "../mock_http_responses/currentforecast";

it('Displays the current temperature at the user\'s location', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: currentforecastMockData });
    const mockPropsData = { 
        location: {
            coords: {
                longitude: 0,
                latitude: 0
            }
        }
    };

    window.alert = () => {};

    render(<CurrentForecast locationObj={mockPropsData} />);
    expect(screen.getByTestId('loading-currentforecast-element')).toHaveTextContent('Loading...');

    const resolved = await waitFor(() => screen.getByTestId('temperature-display-element'));

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(resolved).toHaveTextContent('71.5');
    expect(resolved).toHaveTextContent('Chicago');
});
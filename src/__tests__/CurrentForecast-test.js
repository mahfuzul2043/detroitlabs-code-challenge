import { render, screen, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import CurrentForecast from "../components/CurrentForecast";

it('Displays the current temperature at the user\'s location', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: { name: 'Chicago', main: { temp: 71.5 } } });
    const mockData = { 
        location: {
            coords: {
                longitude: 0,
                latitude: 0
            }
        }
    };

    window.alert = () => {};

    render(<CurrentForecast locationObj={mockData} />);
    expect(screen.getByTestId('loading-currentforecast-element')).toHaveTextContent('Loading...');

    const resolved = await waitFor(() => screen.getByTestId('temperature-display-element'));

    expect(resolved).toHaveTextContent('71.5');
    expect(resolved).toHaveTextContent('Chicago');
});
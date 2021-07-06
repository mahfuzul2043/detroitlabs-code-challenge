import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import App from "../App"

it('Should render navbar and currentforecast initially', async () => {
    const mockGeolocation = {
        getCurrentPosition: jest.fn()
            .mockImplementationOnce((success) => Promise.resolve(success({
                coords: {
                    latitude: 51.1,
                    longitude: 45.3
                }
            })))
    };
    global.navigator.geolocation = mockGeolocation;
    window.alert = () => {};

    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    const navbar = await waitFor(() => screen.getByTestId('navbar-element'));
    const currentforecast = await waitFor(() => screen.getByTestId('currentforecast-element'));

    expect(navbar).toBeInTheDocument();
    expect(currentforecast).toBeInTheDocument();
})
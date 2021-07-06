import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

it('Should render 2 links', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
    expect(screen.getByTestId('navbar-element')).toHaveTextContent('Current Forecast');
    expect(screen.getByTestId('navbar-element')).toHaveTextContent('5 Day Temperatures');
});
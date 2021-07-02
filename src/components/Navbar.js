import { Link } from 'react-router-dom';

/**
 * This component is responsible for displaying the app's navbar
 * @param {object} props Component props
 * @returns Navbar component
 */
function Navbar(props) {
    return (
        <header>
            <div className='navbar-links'>
                <Link to='/current-forecast'>Current Forecast</Link>
                <Link to='/5-day-temperatures'>5 Day Temperatures</Link>
            </div>
        </header>
    )
}

export default Navbar;
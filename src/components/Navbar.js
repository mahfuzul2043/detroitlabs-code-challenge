import { Link } from 'react-router-dom';

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
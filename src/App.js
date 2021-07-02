import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RouteHandler from "./components/RouteHandler";

function App() {
  /**
   * 
   * @param {boolean} success A boolean indicating whether location retrieval was successful
   * @param {string} message Error message if location retrieval was unsuccessful
   * @param {object} location The location object containing details of the user's location
   * @returns 
   */
  const getLocationObj = (success, message, location) => ({ success, message, location })

  /**
   * Gets the users location
   */
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => setLocationObj(getLocationObj(true, null, position)), setError);
    } else { 
      setLocationObj(getLocationObj(false, "Geolocation is not supported by this browser.", null));
    }
  }
  
  /**
   * Sets the error message if there was an error with the user's location
   * @param {object} error The error object
   */
  const setError = error => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setLocationObj(getLocationObj(false, "User denied the request for Geolocation.", null));
        break;
      case error.POSITION_UNAVAILABLE:
        setLocationObj(getLocationObj(false, "Location information is unavailable.", null));
        break;
      case error.TIMEOUT:
        setLocationObj(getLocationObj(false, "The request to get user location timed out.", null));
        break;
      case error.UNKNOWN_ERROR:
      default:
        setLocationObj(getLocationObj(false, "An unknown error occurred.", null));
        break;
    }
  }

  const [locationObj, setLocationObj] = useState(getLocationObj(null, null, null));

  useEffect(() => {
    getLocation();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {locationObj.success === false && locationObj.message}
      {locationObj.success === null && 'Loading...'}
      {locationObj.success === true && (
        <>
          <Navbar />
          <RouteHandler locationObj={locationObj} />
        </>
      )}
    </div>
  );
}

export default App;

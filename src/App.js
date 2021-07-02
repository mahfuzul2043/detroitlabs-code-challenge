import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RouteHandler from "./components/RouteHandler";

function App() {
  const getLocationObj = (success, message, location) => {
    return {
      success, message, location
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => setLocationObj(getLocationObj(true, null, position)), showError);
    } else { 
      setLocationObj(getLocationObj(false, "Geolocation is not supported by this browser.", null));
    }
  }
  
  const showError = error => {
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

import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [showError, setShowError] = useState(false);

  // function to get location data
  async function getLocation() {
    try {
      //                api url  end point                    api key                     location iq   formatting data with json

      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${searchQuery}&format=json`;

      const res = await axios.get(API);
      console.log(res.data[0]);
      setLocation(res.data[0]);

      // change url of the image
      const lat = res.data[0].lat;
      const lon = res.data[0].lon;
      setMapUrl(
        `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${lat},${lon}$zoom=9`
      );
      setShowError(false);
    } catch (error) {
      console.log(error);
      setLocation({});
      setMapUrl("");
      setShowError(true);
    }
  }

  function handlesearch(event) {
    setSearchQuery(event.target.value);
  }
  return (
    <div className="App">
      <input onChange={handlesearch} placeholder="search for a city" />
      <button onClick={getLocation}>Explore</button>
      {showError && <p>That is not a valid location. Git gud.</p>}
      {location.display_name && (
        <p>
          <h3> {location.display_name}</h3> is at lat and lon: {location.lat} / {location.lon}
        </p>
      )}

      <img src={mapUrl} alt="map" />
    </div>
  );
}
export default App;

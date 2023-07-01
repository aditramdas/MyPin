import React, { useEffect, useState } from "react";
import "./Loc.css";
import { comp1, comp2, comp3, ellipse, map } from "./assets";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";

function Loc() {
  const apiKey = import.meta.env.VITE_APP_GMAPS_API_KEY;
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState([]);
  const [pin, setPin] = useState(null);

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  useEffect(() => {
    if (latitude && longitude) {
      handleGetAddress();
    }
  }, [latitude, longitude]);

  const handleGetAddress = async () => {
    try {
      const response = await Geocode.fromLatLng(latitude, longitude);
      const formattedAddress = response.results[1].formatted_address;
      const addressArray = formattedAddress.split(" ");

      setPin(addressArray[addressArray.length - 2].slice(0, -1));
      setAddress(addressArray.slice(1, 4));
      console.log(addressArray);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const success = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    handleGetAddress();
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };
  const center = { lat: latitude, lng: longitude };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="Loc">
      <div className="Loc0">
        <div className="LocFirst">
          <p className="Loc1">Your Current</p>
          <p className="Loc2">Location</p>
        </div>
        <p className="pin">{pin}</p>
        <p className="address">{address.join(" ")}</p>
        <div className="coordinates">
          <p className="coor1">Coordinates:</p>
          <p className="coor2">
            {latitude} , {longitude}
          </p>
        </div>
      </div>
      <div className="icon">
        <img
          src={comp1}
          alt=""
          className="imr"
          onClick={() => {
            navigator.clipboard.writeText(pin);
          }}
        />
        <button onClick={refreshPage} className="refbut">
          <img src={comp2} alt="" className="imr" />
        </button>
        <img
          src={comp3}
          alt=""
          className="imr"
          onClick={() => {
            navigator.clipboard.writeText(`${latitude} , ${longitude}`);
          }}
        />
      </div>
      <div className="map">
        <img src={map} alt="" className="mapimg" />
        <img src={ellipse} alt="" className="ell" />
      </div>
      <div className="gmap">
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <MarkerF position={center} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default Loc;

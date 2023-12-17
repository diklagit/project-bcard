import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { addressToGeocode } from '../services/googleServices';
const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyMapWrapper(MapComponent) {
  return function useAddress({ address }) {
    const [location, setLocation] = useState();

    useEffect(() => {
      const fetchLocation = async () => {
        try {
          const loc = await addressToGeocode(address);
          if (loc) setLocation(loc);
        } catch (e) {
          console.log(e);
        }
      };
      fetchLocation();
    }, [address]);

    if (!location) return null;
    return <MapComponent location={location} />;
  };
}

function MapComponent({ location }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMapWrapper(MapComponent));

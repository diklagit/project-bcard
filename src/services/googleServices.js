const GEOLOCATION_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
export async function addressToGeocode(address) {
  const key = process.env.REACT_APP_MAPS_KEY;
  const addressUri = encodeURIComponent(address);
  const URL = `${GEOLOCATION_URL}?key=${key}&address=${addressUri}`;
  const response = await fetch(URL).then((response) => response.json());
  if (response.results && response.results.length > 0) {
    return response.results[0].geometry.location;
  }
  return null;
}

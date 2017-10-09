/* eslint-disable no-undef */

const geocodeLatLng = (lat, lng) => new Promise((resolve, reject) => {
  const geocoder = new google.maps.Geocoder();
  const OK = google.maps.GeocoderStatus.OK;
  const latlng = { lat, lng };
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status !== OK) {
      reject(status);
    } else {
      resolve(results);
    }
  });
});

export { geocodeLatLng };
export default geocodeLatLng;

import { geocodeLatLng } from './reverseGeocode';

const getCurrentLocationApi = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    const getLatLong = (position) =>
      geocodeLatLng(position.coords.latitude, position.coords.longitude)
        .then((results) => resolve(results[0]))
        .catch((err) => reject(err));

    const getLatLongError = (error) => {
      let errorMessage;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out.';
          break;
        default: // error.UNKNOWN_ERROR:
          errorMessage = 'An unknown error occurred.';
          break;
      }

      reject({ errorMessage });
    };

    navigator.geolocation.getCurrentPosition(getLatLong, getLatLongError);
  } else {
    const error = { errorMessage: 'Geolocation is not supported by this browser.' };
    reject(error);
  }
});
export { getCurrentLocationApi };
export default getCurrentLocationApi;

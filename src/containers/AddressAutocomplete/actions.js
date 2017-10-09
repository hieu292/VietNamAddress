import { toast } from 'react-toastify';
import ActionTypes from './constants';

export const selectedAddress = (address) => ({
  type: ActionTypes.SELECTED_ADDRESS,
  payload: { address },
});

export const selectedAddressSuccess = (address) => ({
  type: ActionTypes.SELECTED_ADDRESS_SUCCESS,
  payload: { address },
});

export const selectedAddressError = (error) => {
  toast.error(error.errorMessage);
  return {
    type: ActionTypes.SELECTED_ADDRESS_ERROR,
    payload: { error },
  };
};

export const getCurrentLocation = () => ({
  type: ActionTypes.GET_CURRENT_LOCATION,
});

export const resetAddress = () => ({
  type: ActionTypes.RESET_LOCATION,
});

export const getCurrentLocationSuccess = (address) => ({
  type: ActionTypes.GET_CURRENT_LOCATION_SUCCESS,
  payload: { address },
});

export const getCurrentLocationError = (error) => {
  toast.error(error.errorMessage);
  return {
    type: ActionTypes.GET_CURRENT_LOCATION_ERROR,
    payload: { error },
  };
};

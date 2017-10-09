import { toast } from 'react-toastify';
import ActionTypes from './constants';
import store from '../../store';
import { resetAddress } from '../AddressAutocomplete/actions';

export const createAddress = (address) => ({
  type: ActionTypes.CREATE_ADDRESS,
  payload: { address },
});

export const createAddressError = (error) => {
  toast.error('Error When Create New Address');
  return {
    type: ActionTypes.CREATE_ADDRESS_ERROR,
    payload: { error },
  };
};

export const createAddressSuccess = (address) => {
  toast.success('New Address Created Successfully');
  store.dispatch(resetAddress());
  return {
    type: ActionTypes.CREATE_ADDRESS_SUCCESS,
    payload: { address },
  };
};

export const loadAddress = () => ({
  type: ActionTypes.LOAD_ADDRESS,
});

export const loadAddressSuccess = (addressList) => ({
  type: ActionTypes.LOAD_ADDRESS_SUCCESS,
  payload: { addressList },
});

export const updateAddress = (key, changedAddress) => ({
  type: ActionTypes.UPDATE_ADDRESS,
  payload: { key, changedAddress },
});

export const updateAddressError = (error) => {
  toast.error('Error When Update Address');

  return {
    type: ActionTypes.UPDATE_ADDRESS_ERROR,
    payload: { error },
  };
};

export const updateAddressSuccess = (address) => {
  toast.success('Address Updated Successfully');

  return {
    type: ActionTypes.UPDATE_ADDRESS_SUCCESS,
    payload: { address },
  };
};

export const getAddressByKey = (key) => ({
  type: ActionTypes.GET_ADDRESS_BY_KEY,
  payload: { key },
});

export const resetStatus = () => ({
  type: ActionTypes.RESET_STATUS,
});

export const resetKey = () => ({
  type: ActionTypes.RESET_KEY,
});

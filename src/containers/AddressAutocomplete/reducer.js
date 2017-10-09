import { Record } from 'immutable';
import ActionTypes from './constants';

export const AddressState = new Record({
  addressGoogle: null,
});

const googleAddressReducer = (state = new AddressState(), { payload, type }) => {
  switch (type) {
    case ActionTypes.SELECTED_ADDRESS_SUCCESS:
      return state.set('addressGoogle', payload.address);
    case ActionTypes.GET_CURRENT_LOCATION_SUCCESS:
      return state.set('addressGoogle', payload.address);
    case ActionTypes.RESET_LOCATION:
      return state.set('addressGoogle', null);
    default:
      return state;
  }
};

export default googleAddressReducer;


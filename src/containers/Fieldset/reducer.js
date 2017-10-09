import { Record, List } from 'immutable';
import ActionTypes from './constants';

export const AddressState = new Record({
  key: null,
  addressList: new List(),
  status: null,
});

const addressReducer = (state = new AddressState(), { payload, type }) => {
  switch (type) {
    case ActionTypes.CREATE_ADDRESS_SUCCESS: {
      const stateStatus = state.set('status', ActionTypes.CREATE_ADDRESS_SUCCESS);
      return stateStatus.set('addressList', state.addressList.unshift(payload.address));
    }
    case ActionTypes.LOAD_ADDRESS_SUCCESS:
      return state.set('addressList', new List(payload.addressList.reverse()));
    case ActionTypes.GET_ADDRESS_BY_KEY:
      return state.set('key', payload.key);
    case ActionTypes.UPDATE_ADDRESS_SUCCESS:
      return state.set('addressList', state.addressList.map((address) =>
        (address.key === payload.address.key ? payload.address : address)));
    case ActionTypes.RESET_STATUS:
      return state.set('status', null);
    case ActionTypes.RESET_KEY:
      return state.set('key', null);
    default:
      return state;
  }
};

export default addressReducer;

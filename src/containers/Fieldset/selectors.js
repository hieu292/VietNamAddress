import { createSelector } from 'reselect';
import _ from 'lodash';

const getKey = (state) => (state.address.key);
const getAddressList = (state) => (state.address.addressList);

const getAddress = createSelector(
  getKey,
  getAddressList,
  (key, list) => {
    const addressFilted = list.filter((address) => _.isEqual(key, address.key));
    const addressArr = addressFilted.toJS();
    return addressArr[0];
  },
);

const getRouting = (state) => (state.routing.location.pathname);

const getKeyParam = createSelector(getRouting, (pathname) => pathname.split('/')[2]);


export { getAddress, getKeyParam };

import { take, call, put, fork } from 'redux-saga/effects';
import { geocodeByAddress } from 'react-places-autocomplete';

import {
  selectedAddressSuccess,
  selectedAddressError,
  getCurrentLocationSuccess,
  getCurrentLocationError,
} from './actions';
import ActionTypes from './constants';
import { getCurrentLocationApi } from '../../utils/geoLocationHtmlApi';

function* getAddress(address) {
  try {
    const results = yield call(geocodeByAddress, address);
    yield put(selectedAddressSuccess(results[0]));
  } catch (error) {
    yield put(selectedAddressError(error));
  }
}


function* watchSelectedAddress() {
  while (true) {
    const { payload } = yield take(ActionTypes.SELECTED_ADDRESS);
    yield fork(getAddress, payload.address);
  }
}

function* getLocationGeoLocation() {
  try {
    const result = yield call(getCurrentLocationApi);
    yield put(getCurrentLocationSuccess(result));
  } catch (err) {
    yield put(getCurrentLocationError(err));
  }
}

function* watchGetCurrentAddress() {
  while (true) {
    yield take(ActionTypes.GET_CURRENT_LOCATION);
    yield fork(getLocationGeoLocation);
  }
}


const addressSagas = [
  watchSelectedAddress,
  watchGetCurrentAddress,
];

export default addressSagas;

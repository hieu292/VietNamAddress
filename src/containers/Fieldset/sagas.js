import { take, call, put, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import ActionTypes from './constants';
import FirebaseMapper from './firebaseMapper';
import { createAddressError, updateAddressError } from './actions';

function subscribe() {
  return eventChannel((emit) => FirebaseMapper.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  } catch (error) {
    yield put(onError(error));
  }
}

const createAddress = write.bind(null, FirebaseMapper, FirebaseMapper.push, createAddressError);
const updateAddress = write.bind(null, FirebaseMapper, FirebaseMapper.update, updateAddressError);

function* watchGetAddress() {
  while (true) {
    yield take(ActionTypes.LOAD_ADDRESS);

    FirebaseMapper.path = 'address';
    yield fork(read);
  }
}

function* watchCreateAddress() {
  while (true) {
    const { payload } = yield take(ActionTypes.CREATE_ADDRESS);
    yield fork(createAddress, payload.address);
  }
}

function* watchUpdateAddress() {
  while (true) {
    const { payload } = yield take(ActionTypes.UPDATE_ADDRESS);
    yield fork(updateAddress, payload.key, payload.changedAddress);
  }
}

const addressSagas = [
  watchGetAddress,
  watchCreateAddress,
  watchUpdateAddress,
];

export default addressSagas;

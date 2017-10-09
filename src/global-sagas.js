import { fork, all } from 'redux-saga/effects';

import addressSagas from './containers/Fieldset/sagas';
import googleAddressSagas from './containers/AddressAutocomplete/sagas';
import exportCSVSagas from './containers/TablePage/sagas';

const sagas = [
  ...addressSagas,
  ...googleAddressSagas,
  ...exportCSVSagas,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;

import { take, call, put } from 'redux-saga/effects';
import { exportCSVSuccess, exportCSVError } from './actions';
import ActionTypes from './constants';
import exportCSV from '../../utils/exportCSV';


function* watchExportCSV() {
  const { payload } = yield take(ActionTypes.EXPORT_CSV);
  try {
    const link = yield call(exportCSV, payload.data);
    yield put(exportCSVSuccess(link));
  } catch (err) {
    yield put(exportCSVError(err));
  }
}

const tableSagas = [
  watchExportCSV,
];

export default tableSagas;

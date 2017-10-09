import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import addressReducer from './containers/Fieldset/reducer';
import googelAddressReducer from './containers/AddressAutocomplete/reducer';
import exportCSVReducer from './containers/TablePage/reducer';

export default combineReducers({
  routing: routerReducer,
  address: addressReducer,
  googleAddress: googelAddressReducer,
  link: exportCSVReducer,
});

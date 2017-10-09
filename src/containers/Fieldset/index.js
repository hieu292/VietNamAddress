import { connect } from 'react-redux';

import View from './view';
import {
  createAddress,
  getAddressByKey,
  updateAddress,
  resetStatus,
  resetKey,
} from './actions';
import { getAddress, getKeyParam } from './selectors';

const mapStateToProps = (state) => ({
  address: getAddress(state),
  keyParam: getKeyParam(state),
  status: state.address.status,
  addressGoogle: state.googleAddress.addressGoogle,
});

const mapDispatchToProps = {
  createAddress,
  getAddressByKey,
  updateAddress,
  resetStatus,
  resetKey,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

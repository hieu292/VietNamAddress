import { connect } from 'react-redux';

import View from './view';
import {
  selectedAddress,
  getCurrentLocation,
  resetAddress,
} from './actions';

const mapDispatchToProps = {
  selectedAddress,
  getCurrentLocation,
  resetAddress,
};

const mapStateToProps = (state) => ({
  address: state.googleAddress.addressGoogle,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

import { connect } from 'react-redux';

import View from './view';

const mapStateToProps = (state) => ({
  address: state.address.addressList.toJS(),
  link: state.link.link,
});

export default connect(
  mapStateToProps,
  null,
)(View);

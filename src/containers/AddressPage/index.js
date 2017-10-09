import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import store, { history } from '../../store';
import { resetKey } from '../Fieldset/actions';
import Button from '../../components/Button';
import AddressAutocomplete from '../AddressAutocomplete';
import Fieldset from '../Fieldset';
import './styles.css';

class Address extends Component {
  handleClick(e) {
    e.preventDefault(this);
    // Reset form if edit mode before
    store.dispatch(resetKey());
    history.push('/new');
  }

  render() {
    let isShowAddButton = false;
    const routeStr = this.props.match.url.split('/')[1];
    if (!_.isEqual(routeStr, 'new')) {
      isShowAddButton = true;
    }
    return (
      <form className="tab-content tabs-login col-lg-12 col-md-12 col-sm-12 cols-xs-12">
        <h2><i className="glyphicon glyphicon-log-in" /> Address Form</h2>
        <AddressAutocomplete />
        <Fieldset />
        <Button
          isShow={isShowAddButton}
          handleClick={(e) => this.handleClick(e)}
          label="New Address"
          link="/new"
          icon="glyphicon glyphicon-plus"
        />
      </form>
    );
  }
}

Address.propTypes = {
  match: PropTypes.object.isRequired,
};


export default Address;

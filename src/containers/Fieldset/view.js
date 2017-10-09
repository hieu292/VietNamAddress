import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Form from '../../components/Form';
import ActionTypes from './constants';

class Fieldset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      address: {
        streetName: {
          name: 'Street Name',
          isTouched: false,
          isValid: true,
          errorMessage: 'Is Required',
          value: '',
        },
        ward: {
          name: 'Ward',
          isTouched: false,
          isValid: true,
          errorMessage: 'Is Required',
          value: '',
        },
        district: {
          name: 'District',
          isTouched: false,
          isValid: true,
          errorMessage: 'Is Required',
          value: '',
        },
        city: {
          name: 'City',
          isTouched: false,
          isValid: true,
          errorMessage: 'Is Required',
          value: '',
        },
        country: {
          name: 'Country',
          isTouched: false,
          isValid: true,
          errorMessage: 'Is Required',
          value: '',
        },
      },
    };
    if (this.props.keyParam) {
      this.props.getAddressByKey(this.props.keyParam);
    }

    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const stateObj = _.clone(this.state);
    const addressObj = _.clone(this.state.address);

    // Reset form after created successfully
    if (_.isEqual(nextProps.status, ActionTypes.CREATE_ADDRESS_SUCCESS)) {
      const address = _.mapValues(addressObj, (obj) => Object.assign(obj, { value: '' }));

      this.setState({ address });
      this.props.resetStatus();
      return;
    }

    if (nextProps.address) {
      _.forEach(nextProps.address, (value, key) => {
        if (_.isEqual(key, 'key')) {
          stateObj.key = value;
        } else {
          stateObj.address[key].value = value;
        }
      });
      this.setState(stateObj);
    } else {
      // Reset address state
      const address = _.mapValues(addressObj, (obj) => Object.assign(obj, { value: '' }));
      this.setState({ address });
    }

    // Receive props from Google Maps API
    if (nextProps.addressGoogle) {
      // Clear Previous Values
      const address = _.mapValues(addressObj, (obj) => Object.assign(obj, { value: '' }));

      _.forEach(nextProps.addressGoogle.address_components, (obj) => {
        if (_.indexOf(obj.types, 'street_number') + 1) {
          address.streetName.value += obj.long_name;
        }
        if (_.indexOf(obj.types, 'route') + 1) {
          address.streetName.value += `, ${obj.long_name}`;
        }

        if (_.indexOf(obj.types, 'sublocality') + 1) {
          address.ward.value += obj.long_name;
        }

        if (_.indexOf(obj.types, 'administrative_area_level_2') + 1) {
          address.district.value += obj.long_name;
        }

        if (_.indexOf(obj.types, 'administrative_area_level_1') + 1) {
          address.city.value += obj.long_name;
        }

        if (_.indexOf(obj.types, 'country') + 1) {
          address.country.value += obj.long_name;
        }
      });
      this.setState({ address: addressObj });
    }
  }

  componentWillUnmount() {
    if (this.props.keyParam) {
      this.props.resetKey();
    }
  }

  onChangeValue(e, key) {
    e.preventDefault();
    const value = e.target.value;
    const checkedObj = this.checkValidation(key, value);
    this.setState(checkedObj);
  }

  checkValidation(key, value) {
    const validateObj = _.clone(this.state);
    let watchObj = validateObj.address[key];
    watchObj = Object.assign(watchObj, { value, isTouched: true });
    if (_.indexOf(['streetName', 'city', 'ward', 'district'], key) + 1) {
      if (_.isEqual(key, 'streetName') && !value) {
        watchObj.isValid = false;
        return validateObj;
      } else if (_.isEqual(key, 'streetName') && value) {
        watchObj.isValid = true;
        return validateObj;
      }

      if (_.isEqual(key, 'city') && !value) {
        watchObj.isValid = false;
        watchObj.errorMessage = '"City" or "Ward" and "District" are required';
        return validateObj;
      } else if (_.isEqual(key, 'city') && value) {
        watchObj.isValid = true;
        validateObj.address.ward.isValid = true;
        validateObj.address.district.isValid = true;
        return validateObj;
      }

      if (validateObj.address.city.value) {
        return validateObj;
      }
      if (_.isEqual(key, 'ward') && !validateObj.address.district.value) {
        if (value) {
          watchObj.isValid = false;
          watchObj.errorMessage = '"District" are required, too';
        } else {
          watchObj.isValid = false;
          watchObj.errorMessage = '"City" or "Ward" and "District" are required';
        }
      } else if (_.isEqual(key, 'district') && !validateObj.address.ward.value) {
        if (value) {
          watchObj.isValid = false;
          watchObj.errorMessage = '"Ward" are required, too';
        } else {
          watchObj.isValid = false;
          watchObj.errorMessage = '"City" or "Ward" and "District" are required';
        }
      } else if (validateObj.address.ward.value && validateObj.address.district.value) {
        validateObj.address.ward.isValid = true;
        validateObj.address.district.isValid = true;
        validateObj.address.city.isValid = true;
      }
    }
    return validateObj;
  }

  save() {
    let checkObj = this.checkValidation('streetName', this.state.address.streetName.value);
    if (!checkObj.address.streetName.isValid) {
      this.setState(checkObj);
      return;
    }

    if (!checkObj.address.ward.value && !checkObj.address.district.value) {
      checkObj = this.checkValidation('city', this.state.address.city.value);
      if (!checkObj.address.city.isValid) {
        this.setState(checkObj);
        return;
      }
    }

    if (checkObj.address.ward.value && !checkObj.address.district.value) {
      checkObj = this.checkValidation('ward', this.state.address.ward.value);
      this.setState(checkObj);
      return;
    }
    if (checkObj.address.district.value && !checkObj.address.ward.value) {
      checkObj = this.checkValidation('district', this.state.address.district.value);
      this.setState(checkObj);
      return;
    }

    const self = this.props;
    const address = _.mapValues(this.state.address, (obj) => obj.value);
    if (this.state.key) {
      // address.key = this.state.key;
      self.updateAddress(this.state.key, address);
    } else {
      self.createAddress(address);
    }
  }

  render() {
    return (
      <fieldset>
        <Form {...this.state.address.streetName} changeValue={(e) => this.onChangeValue(e, 'streetName')} />
        <Form {...this.state.address.ward} changeValue={(e) => this.onChangeValue(e, 'ward')} />
        <Form {...this.state.address.city} changeValue={(e) => this.onChangeValue(e, 'city')} />
        <Form {...this.state.address.district} changeValue={(e) => this.onChangeValue(e, 'district')} />
        <Form {...this.state.address.country} changeValue={(e) => this.onChangeValue(e, 'country')} />
        <div className="col-md-3 submit-container">
          <button type="button" name="save" className="btn btn-lg btn-primary" onClick={this.save}>
            Save
          </button>
        </div>
      </fieldset>
    );
  }
}

Fieldset.propTypes = {
  changeValue: PropTypes.func,
  getAddressByKey: PropTypes.func,
  resetKey: PropTypes.func,
  resetStatus: PropTypes.func,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  keyParam: PropTypes.string,
  status: PropTypes.string,
  address: PropTypes.object,
  addressGoogle: PropTypes.object,
};

export default Fieldset;

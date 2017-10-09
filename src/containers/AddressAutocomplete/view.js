import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import './styles.css';

class AddressAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      AddressForm: {
        address: {
          invalid: false,
          errorMessage: 'Is Required',
        },
      },
    };
    this.onChange = (address) => this.setState({ address });
    this.handleSelect = this.handleSelect.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      this.setState({ address: nextProps.address.formatted_address });
    } else {
      this.setState({ address: '' });
    }
  }

  componentWillUnmount() {
    if (this.props.address) {
      this.props.resetAddress();
    }
  }

  getCurrentLocation(e) {
    e.preventDefault();
    this.props.getCurrentLocation();
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    });

    this.props.selectedAddress(address);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Search Place by Google Maps...',
      autoFocus: true,
    };

    const cssClasses = {
      autocompleteContainer: 'autocomplete-container',
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="suggestion-item">
        <i className="fa fa-map-marker suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    return (
      <div className={this.state.isValid ? 'form-group' : 'form-group has-error'} >
        <label htmlFor="address">Address</label>
        <PlacesAutocomplete
          inputProps={inputProps}
          classNames={cssClasses}
          autocompleteItem={AutocompleteItem}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
        />
        <p className={(this.state.AddressForm.address.invalid ? 'visible-visibility help-block' : 'hidden-visibility help-block')}>{this.state.AddressForm.address.errorMessage}</p>
        <div className="col-md-3">
          <button
            type="button"
            name="get-current-location"
            className="btn btn-lg btn-primary"
            onClick={this.getCurrentLocation}
          >
            <i className="fa fa-map-marker suggestion-icon" /> Get Your Location
          </button>
        </div>
      </div>
    );
  }
}

AddressAutocomplete.propTypes = {
  selectedAddress: PropTypes.func.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
  resetAddress: PropTypes.func.isRequired,
  address: PropTypes.object,
};

export default AddressAutocomplete;

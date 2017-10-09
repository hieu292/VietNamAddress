import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Form = (props) => (
  <div className="col-md-6">
    <div className={props.isValid ? 'form-group' : 'form-group has-error'} >
      <label htmlFor="Street">{props.name}</label>
      <input value={props.value} name="Street" className="form-control form-fixed" placeholder={`${props.name}...`} onChange={props.changeValue} />
      <p className={(props.isValid ? 'hidden-visibility help-block address-form-error' : 'visible-visibility help-block address-form-error')}>{props.errorMessage}</p>
    </div>
  </div>
);
Form.propTypes = {
  changeValue: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Form;

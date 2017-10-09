import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';

const Button = (props) => (
  <Link
    onClick={(e) => props.handleClick(e)}
    to={props.link || '#'}
    className={props.isShow ? 'col-md-2 new-address-btn' : 'col-md-2 new-address-btn hidden-visibility'}
  >
    <span><i className={`${props.icon} btn-new`} />
      {props.label}
    </span>
  </Link>
);

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;

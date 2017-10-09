import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './styles.css';

const Header = (props) => {
  const paths = ['', 'edit', 'new'];
  const routeStr = props.match.url.split('/')[1];
  const isNotFound = !_.includes(paths, routeStr);
  let isAddressActive = false;
  let typeAddress = 'Create';
  if (_.isEqual(routeStr, 'edit')) {
    isAddressActive = true;
    typeAddress = 'Edit';
  }
  if (_.isEqual(routeStr, 'new')) {
    isAddressActive = true;
  }

  return isNotFound ? <span /> : (
    <ul id="top-bar" className="nav nav-tabs nav-justified">
      <li className={isAddressActive ? '' : 'active'}><Link to={isAddressActive ? '/' : '#'}>Address List</Link></li>
      <li className={isAddressActive ? 'active' : ''}><Link to={isAddressActive ? '#' : '/new'}>{typeAddress} Address</Link></li>
    </ul>
  );
};

Header.propTypes = {
  match: PropTypes.object.isRequired,
};


export default Header;

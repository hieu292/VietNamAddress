import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="tab-content tabs-login col-lg-12 col-md-12 col-sm-12 cols-xs-12 text-center">
    <h1>Page Not Found!</h1>
    <h3>Go to <Link to="/">Home Page</Link></h3>
  </div>
);
export default NotFound;

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.css';

const PaginationPanel = (props) => {
  if (props.pages === 1) {
    return (<span />);
  }
  return (
    <ul className="pagination">
      {
        _.map(_.times(props.pages), (i) => {
          const index = i + 1;
          if (_.isEqual(index, props.activePage)) {
            return (
              <li key={index} className="active">
                <a onClick={() => props.handleClick(index)}>{index}</a>
              </li>);
          }
          return (
            <li key={index}>
              <a onClick={() => props.handleClick(index)}>{index}</a>
            </li>
          );
        })
      }
    </ul>
  );
};

PaginationPanel.propTypes = {
  activePage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default PaginationPanel;


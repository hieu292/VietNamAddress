import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Item = (props) => (
  <tr>
    {
      _.map(props.column, (col) => {
        if (col.formatterType === 'link-edit') {
          return (
            <td key={col.order}>
              <Link to={props.data[col.property]}>
                <span className="fa fa-pencil-square-o" />
              </Link>
            </td>
          );
        }
        return (<td key={col.order}>{props.data[col.property]}</td>);
      })
    }
  </tr>
);

Item.propTypes = {
  column: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default Item;

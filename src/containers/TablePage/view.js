import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableData from '../../components/Table';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address,
    };
  }
  componentWillReceiveProps(nextProps) {
    // Handle Download CSV
    if (nextProps.link) {
      nextProps.link.click();
    }
    if (nextProps.address) {
      this.setState({
        address: nextProps.address,
      });
    }
  }
  render() {
    const address = this.state.address.map((obj) => Object.assign(
      {
        edit: `/edit/${obj.key}`,
      }, obj));
    const addressCols = [
      { property: 'key', label: 'key', order: 0 },
      { property: 'streetName', label: 'Street Name', order: 1 },
      { property: 'ward', label: 'Ward', order: 2 },
      { property: 'district', label: 'District', order: 3 },
      { property: 'city', label: 'City', order: 4 },
      { property: 'country', label: 'Country', order: 5 },
      { property: 'edit', label: 'Action', formatterType: 'link-edit', order: 6 },
    ];
    return (
      <div className="tab-content tabs-login col-lg-12 col-md-12 col-sm-12 cols-xs-12">
        <TableData name="Address" data={address} column={addressCols} addNewLink="/new" />
      </div>
    );
  }
}

Table.propTypes = {
  address: PropTypes.array.isRequired,
  link: PropTypes.any,
};

export default Table;

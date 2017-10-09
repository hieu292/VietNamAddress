import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import store from '../../store';
import Item from './item';
import './styles.css';
import Button from '../Button';
import { exportCSV } from '../../containers/TablePage/actions';
import PaginationPanel from '../PaginationPanel';

class Table extends Component {
  constructor(props) {
    super(props);
    const rowPerPage = 9;
    const pages = Math.floor(this.props.data.length / rowPerPage) + 1;
    const activePage = 1;
    let i = 1;
    const dataPagination = {};
    _.forEach(this.props.data, (obj, index) => {
      if (index < i * rowPerPage) {
        if (!dataPagination[i]) {
          dataPagination[i] = [];
          dataPagination[i].push(obj);
        } else {
          dataPagination[i].push(obj);
        }
        if (index + 1 === i * rowPerPage) {
          i += 1;
        }
      }
    });
    this.state = {
      rowPerPage,
      pages,
      activePage,
      data: dataPagination[activePage],
      dataPagination,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      const pages = Math.floor(nextProps.data.length / this.state.rowPerPage) + 1;
      let i = 1;
      const dataPagination = {};
      _.forEach(nextProps.data, (obj, index) => {
        if (index < i * this.state.rowPerPage) {
          if (!dataPagination[i]) {
            dataPagination[i] = [];
            dataPagination[i].push(obj);
          } else {
            dataPagination[i].push(obj);
          }
          if (index + 1 === i * this.state.rowPerPage) {
            i += 1;
          }
        }
      });
      this.setState({
        pages,
        data: dataPagination[this.state.activePage],
        dataPagination,
      });
    }
  }

  handleClickData(data) {
    const dataProps = data || this.props.data;
    const dataExport = _.map(dataProps, (obj) => _.pick(obj, ['key', 'streetName', 'ward', 'district', 'city', 'country']));
    store.dispatch(exportCSV(dataExport));
  }

  handleClickPagination(index) {
    this.setState({ activePage: index, data: this.state.dataPagination[index] });
  }

  render() {
    const columnSorted = _.sortBy(this.props.column, ['order']);

    const tableHead = columnSorted.map((obj) =>
      (<th className={obj.style} key={obj.order}>
        {obj.label}
      </th>));

    const data = _.map(this.state.data, (obj, index) =>
      <Item data={obj} key={obj.key || index} column={columnSorted} />);
    return (
      <div className="table-container">
        <b>{this.props.name}</b>
        <table className="table">
          <thead>
            <tr>
              {tableHead}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <Button
          isShow
          handleClick={() => this.handleClickData(this.props.data)}
          label="Export CSV"
          icon="fa fa-download"
          link="#"
        />
        <PaginationPanel
          pages={this.state.pages}
          activePage={this.state.activePage}
          handleClick={(e) => this.handleClickPagination(e)}
        />
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  column: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default Table;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import Header from '../../components/Header';
import AddressPage from '../AddressPage';
import TablePage from '../TablePage';
import NotFoundPage from '../NotFoundPage';

const Main = () => (
  <div>
    <article className="container-body center-block">
      <section>
        <Route path="*" component={Header} />
        <Switch>
          <Route exact path="/" component={TablePage} />
          <Route exact path="/edit/:key" component={AddressPage} />
          <Route exact path="/new" component={AddressPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </section>
    </article>
    <ToastContainer
      position="top-right"
      type="default"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
    />
  </div>
);


export default Main;

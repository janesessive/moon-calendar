import React, { Component } from "react";

import { Route, Link, Switch } from "react-router-dom";
import "./Layout.css";
import UserForm from "../UserForm/UserForm";
import TransitInfo from "../TransitInfo/TransitInfo";
import HouseInfo from '../HouseInfo/HouseInfo';

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <header>
          <nav className="navbar fixed-top navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
            <span class="navbar-brand mb-0 h1">Panchanga</span>
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Info
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transit">
                  Transit Information
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="content">
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/transit" component={TransitInfo} />
            <Route path="/houseinfo/:id" component={HouseInfo} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default Layout;

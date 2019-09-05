import React, { Component } from "react";

import { Route, Link, Switch } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import "./Layout.css";
import UserForm from "../UserForm/UserForm";
import TransitInfo from "../TransitInfo/TransitInfo";
import HouseInfo from "../HouseInfo/HouseInfo";
import NakshatraInfo from "../NakshatraInfo/NakshatraInfo";
import TarabalaInfo from "../TarabalaInfo/TarabalaInfo";
import DayInfo from "../DayInfo/DayInfo";
import CurrentInfo from "../CurrentInfo/CurrentInfo";

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <NavBar />
        

        {/* <nav className="navbar fixed-top navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
              <span className="navbar-brand mb-0 h1">Panchanga</span>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Инфо
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/current-info">
                  Текущая информация
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transit">
                  Транзиты
                </Link>
              </li>
            </ul>
          </nav> */}

        <main className="content">
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/transit" component={TransitInfo} />
            <Route path="/houseinfo/:id" component={HouseInfo} />
            <Route path="/nakshatrainfo/:id" component={NakshatraInfo} />
            <Route path="/tarabalainfo/:id" component={TarabalaInfo} />
            <Route path="/dayinfo/:id" component={DayInfo} />
            <Route path="/current-info" component={CurrentInfo} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default Layout;

import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { RingLoader } from "react-spinners";
import { getChandraBala, determineGoodBadDay } from "../../services/astro";

import DatePicker from "react-datepicker";
import { css } from "@emotion/core";
import "./TransitInfo.css";

// import panchang from "../../lib/panchang";
// import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, formatDateToMinutes } from "../../lib/utils";
import { findMoonTransits, findMoonTransitsAsync } from "../../services/astro";
// import moment from "moment";
// const key = "panchanga-data";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

class TransitInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: new Date(),
      dateTo: new Date().setDate(new Date().getDate() + 30),
      transits: [],
      loading: false
    };
    this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
    this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
  }

  componentDidMount() {
    this.calculateOnClick();
  }

  handleChangeDateFrom(date) {
    this.setState({
      dateFrom: date
    });
  }

  handleChangeDateTo(date) {
    this.setState({
      dateTo: date
    });
  }

  calculateOnClick = () => {
    this.setState({ loading: true, transits: [] }, async () => {
      setTimeout(async () => {
        const transits = await findMoonTransitsAsync(
          this.state.dateFrom,
          this.state.dateTo
        );
        this.setState({ loading: false });
        this.setState({ transits });
      }, 10);
    });
  };

  render() {
    if (!this.props.birthData) {
      return (
        <div>
          <h2>Пожалуйста, введите дату рождения на первой странице</h2>
        </div>
      );
    }
    return (
      <div className="container">
        <form>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <label className="my-1 mr-2" htmlFor="inlineFormInput">
                Начало периода
              </label>
              <DatePicker
                className="form-control mb-2"
                selected={this.state.dateFrom}
                onChange={this.handleChangeDateFrom}
                disabled={this.state.loading}
              />
            </div>
            <div className="col-auto">
              <label className="my-1 mr-2" htmlFor="inlineFormInput">
                Конец периода
              </label>
              <DatePicker
                className="form-control mb-2"
                selected={this.state.dateTo}
                onChange={this.handleChangeDateTo}
                disabled={this.state.loading}
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={this.calculateOnClick}
                disabled={this.state.loading}
              >
                Расчитать
              </button>
            </div>
          </div>
        </form>

        {this.state.loading ? (
          <div
            style={{
              flex: 1,
              marginTop: 240,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <RingLoader
              sizeUnit={"px"}
              size={50}
              color={"#123abc"}
              css={override}
              loading={true}
            />
          </div>
        ) : null}
        {this.state.transits.length === 0 || this.state.loading ? null : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Зодиак</th>
                <th scope="col">Начало</th>
                {/* <th scope="col">Долгота</th> */}
                <th scope="col">Лунный Дом</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transits.map(transit => {
                const chandraBala = getChandraBala(
                  this.props.birthData.moon,
                  transit.index
                );
                return (
                  <tr key={transit.date}>
                    <td>{transit.name}</td>
                    <td>{formatDateToMinutes(transit.dateFrom)}</td>
                    {/* <td>{transit.lon}</td> */}
                    {/* <td>{transit.index}</td> */}
                    <td>
                      {typeof transit.index === "number" ? (
                        <Link
                          className={determineGoodBadDay(chandraBala)}
                          to={`/houseinfo/${chandraBala}`}
                        >
                          {chandraBala}
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    );
  }
}

export default connect(
  state => state,
  null
)(TransitInfo);

import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import panchang from "../../lib/panchang";
// import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, formatDateToMinutes } from "../../lib/utils";
import { findMoonTransits } from "../../services/astro";
// import moment from "moment";
// const key = "panchanga-data";

class TransitInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: new Date(),
      dateTo: new Date(),
      transits: []
    };
    this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
    this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
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

  calculate = (dateFrom, dateTo) => {
    return findMoonTransits(dateFrom, dateTo);
    return [
      {
        name: "Овен",
        dateFrom: new Date(),
        dateTo: new Date()
      },
      {
        name: "Телец",
        dateFrom: new Date(),
        dateTo: new Date()
      },
      {
        name: "Близнецы",
        dateFrom: new Date(),
        dateTo: new Date()
      },
      {
        name: "Рак",
        dateFrom: new Date(),
        dateTo: new Date()
      },
      {
        name: "Лев",
        dateFrom: new Date(),
        dateTo: new Date()
      }
    ];
  };

  calculateOnClick=()=> {
    const transits = this.calculate(this.state.dateFrom, this.state.dateTo);
    this.setState({ transits });
  }

  render() {
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
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={this.calculateOnClick}
              >
                Calculate
              </button>
            </div>
          </div>
        </form>
        {this.state.transits.length===0? null :
        <table className="table table-striped">
        <thead>
    <tr>
      <th scope="col">Зодиак</th>
      <th scope="col">Начало</th>
      {/* <th scope="col">Конец</th> */}
     
   </tr>
  </thead>
          <tbody>
        {this.state.transits.map(transit => {
        return (<tr key={transit.date}>
         <td>{transit.name}</td>
         <td>{formatDateToMinutes(transit.dateFrom)}</td>
         {/* <td>{formatDateToMinutes(transit.dateTo)}</td> */}
         </tr>)
         

        })}
        </tbody>
        </table>}

      {/* <pre>{JSON.stringify(this.state.transits, null, 2)}</pre> */}
      </div>
    );
  }
}

export default TransitInfo;

import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import panchang from "../../lib/panchang";
// import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
// const key = "panchanga-data";

class TransitInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dateFrom: new Date(),
          dateTo: new Date(),
          
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
    render() {
        return (
            <div className="containter">
<form>
  <div className="form-row align-items-center">
    <div className="col-auto">
      <label className="my-1 mr-2" for="inlineFormInput">Начало периода</label>
      <DatePicker
                    className="form-control mb-2"
                    selected={this.state.dateFrom}
                    onChange={this.handleChangeDateFrom}
                  />
    </div>
    <div className="col-auto">
      <label className="my-1 mr-2" for="inlineFormInput">Конец периода</label>
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
                    // onClick={this.calculateResult}
                  >
                    Calculate
                  </button>
    
    </div>
  </div>
</form>


                {/* <label htmlFor="dateFrom">Начало периода </label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.dateFrom}
                    onChange={this.handleChangeDateFrom}
                  />
                </div>
                <label htmlFor="dateTo">Конец периода </label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.dateTo}
                    onChange={this.handleChangeDateTo}
                  />
                </div>
                <button
                    style={{ margin: "10px" }}
                    type="button"
                    className="btn btn-primary"
                    // onClick={this.calculateResult}
                  >
                    Calculate
                  </button> */}

            </div>
        )
    }
};

export default TransitInfo;
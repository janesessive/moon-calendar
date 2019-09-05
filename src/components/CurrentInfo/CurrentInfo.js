import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import { houseData } from "../../lib/houseData";
import { calculatePanchanga, getChandraBala } from "../../services/astro";

class CurrentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
    this.handleChangeCurrentDate = this.handleChangeCurrentDate.bind(this);
  }

  componentDidMount() {
    if (!this.props.birthData) {
      this.props.history.push("/");
      return;
    }
    this.calculateOnClick();
  }

  handleChangeCurrentDate(date) {
    this.setState({
      currentDate: date
    });
  }

  calculateOnClick = () => {
    const currentInfo = calculatePanchanga(this.state.currentDate);
    this.setState({ currentInfo });

    const chandrabala = getChandraBala(
      this.props.birthData.moon,
      currentInfo.Raasi.index
    );

    this.setState({ chandrabala });
    const description = houseData.find(d => d.id === chandrabala);
    this.setState({ description });
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
        <div
          className="panel border"
          style={{
            padding: 20,
            backgroundColor: "whitesmoke",
            marginBottom: 20
          }}
        >
          <form>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <label className="my-1 mr-2" htmlFor="inlineFormInput">
                  Дата
                </label>
                <DatePicker
                  className="form-control mb-2"
                  selected={this.state.currentDate}
                  onChange={this.handleChangeCurrentDate}
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={this.calculateOnClick}
                >
                  Расчитать
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <PanchangaInfo
              birthInfo={this.props.birthData}
              info={this.state.currentInfo}
              currentDate={this.state.currentDate}
            />
          </div>
          <div
            className="col-sm-6"
            style={{
              width: "800px",
              margin: "0 auto",
              borderLeft: "1px solid lightgray",
              padding: "20px"
            }}
          >
            {this.state.chandrabala ? (
              <h2>Лунный дом: {this.state.chandrabala}</h2>
            ) : (
              ""
            )}

            <h3>
              {this.state.description ? this.state.description.title : ""}
            </h3>
            <p>
              {this.state.description ? this.state.description.description : ""}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  null
)(CurrentInfo);

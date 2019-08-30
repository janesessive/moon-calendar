import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import DatePicker from "react-datepicker";

import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import "react-datepicker/dist/react-datepicker.css";
import { houseData } from "../../lib/houseData";
import moment from "moment";
import { applyTimeZone, calculatePanchanga } from "../../services/astro";
const key = "panchanga-data";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      birthDate: new Date(),
      timeZone: "",
      selectedOption: ""
    };
    this.handleChangeCurrentDate = this.handleChangeCurrentDate.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
  }

  componentDidMount() {
    let item = JSON.parse(localStorage.getItem(key));
    if (item && item.birthDate && item.timeZone && item.selectedOption) {
      const birthDate = new Date(item.birthDate);
      this.setState(
        {
          birthDate: birthDate,
          timeZone: item.timeZone,
          selectedOption: item.selectedOption
        },
        () => {
          this.calculateResult();
        }
      );
    }
  }

  handleChangeCurrentDate(date) {
    this.setState({
      currentDate: date
    });
  }

  handleChangeBirthDate(date) {
    this.setState({
      birthDate: date
    });
  }

  onTimeZoneChanged = e => {
    const zoneNumber = e.target.value;
    this.setState({ timeZone: zoneNumber });
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  saveData = () => {
    let myObj = {
      birthDate: this.state.birthDate,
      timeZone: this.state.timeZone,
      selectedOption: this.state.selectedOption
    };
    console.log(myObj);
    localStorage.setItem(key, JSON.stringify(myObj));
  };


  calculateResult = () => {
     
    const utcDate = applyTimeZone(this.state.birthDate, this.state.timeZone, this.state.selectedOption);
    
    const birthInfo = calculatePanchanga(utcDate);
    const currentInfo = calculatePanchanga(this.state.currentDate);
    //TODO: call calculate here
   
    this.setState({ birthInfo, currentInfo });
    var birthData = {moon: birthInfo.Raasi.index, nakshatra: birthInfo.Nakshatra.index};
    // store.dispatch(setBirthData(birthData));
   
    this.props.setBirthData(birthData);

    let houseNumber = currentInfo.Raasi.index - birthInfo.Raasi.index;
    if (houseNumber < 0) {
      houseNumber = houseNumber + 12;
    }

    houseNumber++;
    this.setState({ houseNumber });

    const description = houseData.find(d => d.id === houseNumber);
    this.setState({ description });
  };

  render() {
    return (
      <div className="containter">
        <div className="row">
          <div className="col-sm-3">
            <form className="container border border-secondary rounded">
              <div className="form-group">
                <label htmlFor="currentDate">День прогноза: </label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.currentDate}
                    onChange={this.handleChangeCurrentDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Дата и время Рождения: </label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.birthDate}
                    onChange={this.handleChangeBirthDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-auto">
                  <label htmlFor="timeZone">Часовой пояс: </label>
                  <input
                    className="form-control"
                    style={{ width: "60px" }}
                    id="timeZone"
                    type="number"
                    onChange={this.onTimeZoneChanged}
                    value={this.state.timeZone}
                  />
                </div>

                {/* 
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="west"
                      checked={this.state.selectedOption === "west"}
                      onChange={this.handleOptionChange}
                    />
                    West
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="east"
                      checked={this.state.selectedOption === "east"}
                      onChange={this.handleOptionChange}
                    />
                    East
                  </label>
                </div> */}

                <div className="col-auto">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="east"
                      value="east"
                      checked={this.state.selectedOption === "east"}
                      onChange={this.handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="east">
                      east
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="west"
                      value="west"
                      checked={this.state.selectedOption === "west"}
                      onChange={this.handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="west">
                      west
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    style={{ margin: "10px" }}
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveData}
                  >
                    Save data
                  </button>

                  <button
                    style={{ margin: "10px" }}
                    type="button"
                    className="btn btn-primary"
                    onClick={this.calculateResult}
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-sm-3">
            <PanchangaInfo
              info={this.state.birthInfo}
              currentDate={this.state.birthDate}
            />
          </div>
          <div className="col-sm-3">
            <PanchangaInfo
              birthInfo={this.state.birthInfo}
              info={this.state.currentInfo}
              currentDate={this.state.currentDate}
            />
          </div>
          <div
            className="col-sm-3"
            style={{
              width: "800px",
              margin: "0 auto",
              borderLeft: "1px solid lightgray",
              padding: "20px"
            }}
          >
            {this.state.houseNumber ? (
              <h2>Лунный дом: {this.state.houseNumber}</h2>
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


export default connect(state => state, dispatch => bindActionCreators(actionCreators, dispatch))(UserForm);


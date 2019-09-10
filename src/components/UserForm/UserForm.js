import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import DatePicker from "react-datepicker";
import Undraw from './undraw_virtual.png';

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
      birthDate: new Date(),
      timeZone: "",
      selectedOption: ""
    };
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
          const birthPanchanga = this.calculateBirthPanchanga(
            this.state.birthDate,
            this.state.timeZone,
            this.state.selectedOption
          );
          debugger;
          this.setState({ birthInfo: birthPanchanga });
    //      this.props.setBirthData(birthPanchanga); //REDUX store
        }
      );
    }
  }

  handleChangeBirthDate(date) {
    const birthDateError = this.validateBirthDate(date);
    this.setState({
      birthDate: date,
      birthDateError
    });
  }

  onTimeZoneChanged = e => {
    const zoneNumber = e.target.value;
   const tzError = this.validateTimeZone(zoneNumber);

    this.setState({ timeZone: zoneNumber , tzError});
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

  handleOkButtonClick = () => {
    const birthPanchanga = this.calculateBirthPanchanga(
      this.state.birthDate,
      this.state.timeZone,
      this.state.selectedOption
    );
    birthPanchanga.date = this.state.birthDate;
    this.setState({ birthInfo: birthPanchanga });
    this.props.setBirthData(birthPanchanga); //REDUX store
  };

  calculateBirthPanchanga = (birthDate, timeZone, timeZoneOption) => {
    //this.state.birthDate, this.state.timeZone, this.state.selectedOption
    const utcDate = applyTimeZone(birthDate, timeZone, timeZoneOption);

    const birthInfo = calculatePanchanga(utcDate);
    //TODO: call calculate here

    var birthData = {
      moon: birthInfo.Raasi.index,
      nakshatra: birthInfo.Nakshatra.index
    };

    const result = { ...birthInfo, ...birthData };
    return result;
  };

  validateTimeZone=(value)=> {
    if (!value) return "required";
    const tz = parseFloat(value);
    if (!tz || isNaN(tz)) return "invalid format";
    if (tz<0 ||tz>12) return "out of range";
    return "";
  }

  validateBirthDate=(value)=> {
    if (!value) return "required";
    return "";
  }

  render() {
    let tzClass="form-control";
    if (this.state.tzError) {
      tzClass += " error";
    }
    return (
      <div className="container" style={{  
        backgroundImage: `url(${Undraw})`,
        backgroundOrigin:'content-box',
        backgroundPosition: 'left-bottom',
        // backgroundAttachment: 'fixed',
        backgroundSize: '58%',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="pageHeader">
         <h2>Информация по дате рождения</h2>  
        </div>
        <div className="row">
          <div className="col-md-6">
            
            <form
              className="container border border-secondary rounded"
              style={{ width: 340 , padding: 20, backgroundColor: "whitesmoke"}}
            >
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
                  <span style={{color: 'red'}}>{this.state.birthDateError}</span>
                </div>
              </div>
              <div className="form-row">
                <div className="col-auto">
                  <label htmlFor="timeZone">Часовой пояс: </label>
                  <input
                    className={tzClass}
                    style={{ width: "60px" }}
                    id="timeZone"
                    type="number"
                    onChange={this.onTimeZoneChanged}
                    value={this.state.timeZone}
                  />
                  <span style={{color: 'red'}}>{this.state.tzError}</span>
                </div>

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
                      восток
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
                      запад
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
                    Сохранить
                  </button>

                  <button
                    style={{ margin: "10px" }}
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleOkButtonClick}
                  >
                    Расчитать
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <PanchangaInfo
              info={this.state.birthInfo}
              currentDate={this.state.birthDate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(UserForm);

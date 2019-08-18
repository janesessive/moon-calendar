import React, { Component } from "react";
import DatePicker from "react-datepicker";
import panchang from "../../lib/panchang";
import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import "react-datepicker/dist/react-datepicker.css";
import { dataResult } from "../../lib/dataResult";
import moment from "moment";
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

  calculateNextSignStart = (utcDate, info)=>{
    const pathToNextSign = 30 - info.Raasi.degreeAbsolute % 30;
    return this.findTransitDate(utcDate, info, pathToNextSign);
  };

  calculateFirstSignStart = (utcDate, info)=>{
    const pathToNextSign = -1 * info.Raasi.degreeAbsolute % 30;
    return this.findTransitDate(utcDate, info, pathToNextSign);
    
  };

  findTransitDate = (utcDate, info, pathToNextSign)=>{
    const begins = new Date(new Date(utcDate).setUTCHours(0,0,0,0));
    const ends = new Date(new Date(begins).setDate(begins.getDate()+1));       
    const birthInfo1 = panchang.calculate(begins);
    const birthInfo2 = panchang.calculate(ends);
    let fullDayPath = birthInfo2.Raasi.degreeAbsolute - birthInfo1.Raasi.degreeAbsolute;
    if(fullDayPath < 0) fullDayPath+=360;
    const dayMilliSeconds = 86400000.00;
    const moonSpeed = fullDayPath / dayMilliSeconds;
    const ms = pathToNextSign / moonSpeed
    const nextSignDate = new Date(utcDate.getTime() + ms);
    var result = panchang.calculate(nextSignDate);
    if(result.Raasi.degree > 0 ){
      var timeToReduce = result.Raasi.degree / moonSpeed;
      return new Date(nextSignDate.getTime() - timeToReduce);

    }
    
    return nextSignDate;    
  }
  calculateResult = () => {
    let m = moment(this.state.birthDate);
    console.log(m.format());
    let timeZone = this.state.timeZone;
    timeZone = parseInt(timeZone);
    if (this.state.selectedOption === "east") {
      timeZone = timeZone * -1;
    }

    m.add(timeZone, "hours");
    console.log("utc", m.format());
    let utcDate = m.toDate();

    const birthInfo = panchang.calculate(utcDate);
    let bInfo = { ...birthInfo };
    this.setState({ birthInfo: bInfo });

    let currentDate = this.state.currentDate;
    const currentInfo = panchang.calculate(currentDate);

    var firstDate = this.calculateFirstSignStart(currentDate, currentInfo);
    
    var result = this.calculateNextSignStart(currentDate, currentInfo);
    currentInfo.Raasi.nextSignDate = result;
    currentInfo.Raasi.firstSignDate = firstDate;
    this.setState({ currentInfo, currentDate });

    let houseNumber = currentInfo.Raasi.index - birthInfo.Raasi.index;
    if (houseNumber < 0) {
      houseNumber = houseNumber + 12;
    }

    houseNumber++;
    this.setState({ houseNumber });

    const description = dataResult.find(d => d.id === houseNumber);
    this.setState({ description });
  };

  render() {
    return (
      <div className="containter">
        <div class="row">
          <div className="col-sm-3">
            <form className="container border">
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
                <div class="col-auto">
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

                <div class="col-auto">
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
                    <label className="form-check-label" for="east">
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
                    <label className="form-check-label" for="west">
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
              info={this.state.currentInfo}
              currentDate={this.state.currentDate}
            />
          </div>
          <div
            className="col-sm-3"
            style={{
              width: "800px",
              margin: "0 auto",
              border: "1px solid lightgray",
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

export default UserForm;

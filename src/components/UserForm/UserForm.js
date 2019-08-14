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
              <div className="form-group">
                <label htmlFor="timeZone">Часовой пояс: </label>
                <input
                  className="form-control"
                  style={{ width: "60px" }}
                  id="timeZone"
                  type="number"
                  onChange={this.onTimeZoneChanged}
                  value={this.state.timeZone}
                />

                {/* <label>
              <input type="checkbox" value="west" name="zone" id="zone_west" />
              West
            </label>
            <label>
              <input type="checkbox" value="east" name="zone" id="zone_east" />
              East
            </label> */}

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
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="east"
                      checked={this.state.selectedOption === "east"}
                      onChange={this.handleOptionChange}
                    />
                    East
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveData}
                  >
                    Save data
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.calculateResult}
              >
                Calculate
              </button>
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
            padding:'20px'
          }}
        >
          {this.state.houseNumber ? (
            <h2>Лунный дом: {this.state.houseNumber}</h2>
          ) : (
            ""
          )}

          <h3>{this.state.description ? this.state.description.title : ""}</h3>
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

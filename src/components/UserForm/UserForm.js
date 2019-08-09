import React, { Component } from "react";
import DatePicker from "react-datepicker";
import panchang from "../../lib/panchang";
import PanchangaInfo from "../PanchangaInfo/PanchangaInfo";
import "react-datepicker/dist/react-datepicker.css";
import { dataResult } from "../../lib/dataResult";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      birthDate: new Date(),
      timeZone: null
    };
    this.handleChangeCurrentDate = this.handleChangeCurrentDate.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
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

  calculateResult = () => {
    let birthDate = this.state.birthDate;
    const birthInfo = panchang.calculate(birthDate);
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
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="currentDate">Дата и время Рождения: </label>
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
              id="timeZone"
              type="number"
              onChange={this.onTimeZoneChanged}
              value={this.state.timeZone}
            />

            <label>
              <input type="checkbox" value="west" name="zone" id="zone_west" />
              West
            </label>
            <label>
              <input type="checkbox" value="east" name="zone" id="zone_east" />
              East
            </label>
          </div>
        </form>
        <button
          type="button"
          class="btn btn-primary"
          onClick={this.calculateResult}
        >
          Calculate
        </button>
        <div>
          <PanchangaInfo
            info={this.state.birthInfo}
            currentDate={this.state.birthDate}
          />
          <PanchangaInfo
            info={this.state.currentInfo}
            currentDate={this.state.currentDate}
          />
        </div>
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
    );
  }
}

export default UserForm;

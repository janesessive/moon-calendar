import React, { Component } from 'react';
import DatePicker from "react-datepicker"; 
import panchang from '../../lib/panchang';
import PanchangaInfo from '../PanchangaInfo/PanchangaInfo';
import "react-datepicker/dist/react-datepicker.css";
import { dataResult } from '../../lib/dataResult';


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          timeZone: null,

        };
        this.handleChange = this.handleChange.bind(this);
      }
     
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

      onTimeZoneChanged = e => {
        const zoneNumber = e.target.value;
        this.setState({ timeZone: zoneNumber });
      };

      calculateResult = () => {

        let birthDate = this.state.startDate;
        const birthInfo = panchang.calculate(birthDate);
        let bInfo = {...birthInfo};
        this.setState({birthInfo: bInfo });
        
const currentDate = new Date();
        const currentInfo = panchang.calculate(currentDate);
        this.setState({currentInfo, currentDate});

        let houseNumber = currentInfo.Raasi.index - birthInfo.Raasi.index;
        if (houseNumber < 0) {
            houseNumber = houseNumber + 12;
        }

        houseNumber++;
        this.setState({houseNumber});

        const description =dataResult.find(d=>d.id === houseNumber);
        this.setState({description})



      }

      render() {
        return (
            <div>
            <form>
          <div className="form-group">
            <label htmlFor="birthDate">Дата и время Рождения: </label>
          <div>
              <DatePicker
              className="form-control"
                selected={this.state.startDate}
                onChange={this.handleChange}
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
              className="form-control"
              id="timeZone"
              type="number"
              onChange={this.onTimeZoneChanged}
              value={this.state.timeZone}
            />
          </div>
          </form>
          <button 
          type="button" 
          class="btn btn-primary" 
          onClick={this.calculateResult}
          >Calculate</button>
          <div>
              <PanchangaInfo info={this.state.birthInfo} currentDate={this.state.startDate}/>
              <PanchangaInfo info={this.state.currentInfo} currentDate={this.state.currentDate}/>

          </div>
          <h2>Лунный дом: {this.state.houseNumber}</h2>
        
          <h3>{this.state.description? this.state.description.title : ""}</h3>
          <p>{this.state.description? this.state.description.description : ""}</p>
          </div>
        );
      }
}

export default UserForm;
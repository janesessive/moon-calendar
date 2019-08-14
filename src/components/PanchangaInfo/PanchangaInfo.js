import React from "react";
import translate from "../../lib/Translator";
import { formatDate, formatDateToMinutes } from "../../lib/utils";
import './PanchangaInfo.css';

const PanchangaInfo = props => {
  if (!props.info) {
    return null;
  }

  return (
    <div className="container">
      <div className="form-group row">
        <label for="date" className="col-sm-3 col-form-label">
          Date
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="date"
            value={formatDate(props.currentDate)}
          />
        </div>
      </div>
      <div className="form-group row" >
      <label for="day" className="col-sm-3 col-form-label">
          День недели
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="day"
            value={props.info.Day.name}
          />
        </div>
      </div>
      <div className="form-group row" >
      <label for="moon" className="col-sm-3 col-form-label">
      Луна
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="day"
            value={translate(props.info.Raasi.name)}
          />
        </div>
      </div>
      <div className="form-group row" >
      <label for="nakshatra" className="col-sm-3 col-form-label">
      Naksatra
        </label>
        <div class="col-sm-9">
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="day"
            value={props.info.Nakshatra.name}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="nakshatra-start"
            value={formatDateToMinutes(props.info.Nakshatra.start)}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="nakshatra-end"
            value={formatDateToMinutes(props.info.Nakshatra.end)}
          />
          
        </div>
      </div>
      <div className="form-group row" >
      <label for="tithi" className="col-sm-3 col-form-label">
      Tithi
        </label>
        <div class="col-sm-9">
          <input
            type="tithi"
            readonly
            className="form-control-plaintext"
            id="tithi"
            value={props.info.Tithi.name}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="tithi-start"
            value={formatDateToMinutes(props.info.Tithi.start)}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="tithi-end"
            value={formatDateToMinutes(props.info.Tithi.end)}
          />
        </div>
      </div>
      <div className="form-group row" >
      <label for="karna" className="col-sm-3 col-form-label">
      Karna
        </label>
        <div class="col-sm-9">
          <input
            type="karna"
            readonly
            className="form-control-plaintext"
            id="karna"
            value={props.info.Karna.name}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="karna-start"
            value={formatDateToMinutes(props.info.Karna.start)}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="karna-end"
            value={formatDateToMinutes(props.info.Karna.end)}
          />
        </div>
      </div>
      <div className="form-group row" >
      <label for="yoga" className="col-sm-3 col-form-label">
      Yoga
        </label>
        <div class="col-sm-9">
          <input
            type="yoga"
            readonly
            className="form-control-plaintext"
            id="yoga"
            value={props.info.Yoga.name}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="yoga-start"
            value={formatDateToMinutes(props.info.Yoga.start)}
          />
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="yoga-end"
            value={formatDateToMinutes(props.info.Yoga.end)}
          />
        </div>
      </div>
    </div>
  );
};

export default PanchangaInfo;

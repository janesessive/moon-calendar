import React from "react";
import { Link } from "react-router-dom";
import translate from "../../lib/Translator";
import { formatDate, formatDateToMinutes } from "../../lib/utils";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

import "./PanchangaInfo.css";
import { calculateTarabala } from "../../services/astro";

const PanchangaInfo = props => {
  if (!props.info) {
    return null;
  }
  let chandrabala = null;
  let tarabala = null;
  if (props.birthInfo) {
    let houseNumber = props.info.Raasi.index - props.birthInfo.Raasi.index;
    if (houseNumber < 0) {
      houseNumber = houseNumber + 12;
    }

    chandrabala = houseNumber + 1;

    tarabala = calculateTarabala(
      props.birthInfo.Nakshatra.index + 1,
      props.info.Nakshatra.index + 1
    );
  }

  return (
    <div className="container">
      <div className="form-group row">
        <label for="date" className="col-sm-3 col-form-label">
          Date
        </label>
        <div class="col-sm-9">
          <input
            style={{ fontWeight: "bold", color: "darkblue" }}
            type="text"
            readonly
            className="form-control-plaintext"
            id="date"
            value={formatDate(props.currentDate)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label for="day" className="col-sm-3 col-form-label">
          День недели
        </label>
        <div class="col-sm-9">
          
          <Link to={`/dayinfo/${props.info.Day.index + 1}`}>
            {props.info.Day.name}
          </Link>
        </div>
      </div>
      <div className="form-group row">
        <label for="moon" className="col-sm-3 col-form-label">
          Луна
        </label>
        <div class="col-sm-9">
          <input
            style={{ fontWeight: "bold", color: "darkblue" }}
            type="text"
            readonly
            className="form-control-plaintext"
            id="moon"
            value={translate(props.info.Raasi.name)}
          />
          {chandrabala ? <Link to={`/houseinfo/${chandrabala}`}>{chandrabala}</Link> : null}
          {/* <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="moon-degree"
            value={props.info.Raasi.degreeAbsolute}
          /> */}
          {props.info.Raasi.firstSignDate ? (
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="moon-next-sign"
              value={formatDateToMinutes(props.info.Raasi.firstSignDate)}
            />
          ) : null}
          {props.info.Raasi.nextSignDate ? (
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="moon-next-sign"
              value={formatDateToMinutes(props.info.Raasi.nextSignDate)}
            />
          ) : null}
          {/* <pre>{JSON.stringify(props.info.Raasi, null,2)}</pre> */}
        </div>
      </div>
      <div className="form-group row">
        <label for="nakshatra" className="col-sm-3 col-form-label">
          Naksatra
        </label>
        <div class="col-sm-9">
          <Link to={`/nakshatrainfo/${props.info.Nakshatra.index + 1}`}>
            {props.info.Nakshatra.name}
          </Link>
          {tarabala?
          <Link  to={`/tarabalainfo/${tarabala}`}>
            {" (" + tarabala + ")"}
          </Link> : null}
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
      <div className="form-group row">
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
      <div className="form-group row">
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
      <div className="form-group row">
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

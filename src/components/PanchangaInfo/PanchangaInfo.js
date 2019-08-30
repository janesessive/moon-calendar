import React from "react";
import { Link } from "react-router-dom";
import { translateSign, translateDay, translateNaks, translateTithi, translateKarana, translateYoga } from "../../lib/Translator";
import { formatDate, formatDateToMinutes } from "../../lib/utils";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

import "./PanchangaInfo.css";
import { calculateTarabala, getChandraBala } from "../../services/astro";

const PanchangaInfo = props => {
  if (!props.info) {
    return null;
  }
  let chandrabala = null;
  let tarabala = null;
  if (props.birthInfo) {
    chandrabala = getChandraBala(props.info.Raasi.index, props.birthInfo.Raasi.index);
    
    tarabala = calculateTarabala(
      props.birthInfo.Nakshatra.index + 1,
      props.info.Nakshatra.index + 1
    );
  }

  return (
    <div className="container">
      <div className="form-group row">
        <label htmlFor="date" className="col-sm-4 col-form-label">
          Дата
        </label>
        <div className="col-sm-8">
          <input
            style={{ fontWeight: "bold", color: "darkblue" }}
            type="text"
            readOnly
            className="form-control-plaintext"
            id="date"
            value={formatDate(props.currentDate)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="day" className="col-sm-4 col-form-label">
          День недели
        </label>
        <div className="col-sm-8">
          
          <Link className="form-control-plaintext customLink" to={`/dayinfo/${props.info.Day.index + 1}`}>
            {translateDay(props.info.Day.name)}
          </Link>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="moon" className="col-sm-4 col-form-label">
          Луна
        </label>
        <div className="col-sm-8">
          <input
            style={{ fontWeight: "bold", color: "darkblue" }}
            type="text"
            readOnly
            className="form-control-plaintext"
            id="moon"
            value={translateSign(props.info.Raasi.name)}
          />
          {chandrabala ? <Link className="form-control-plaintext customLink" to={`/houseinfo/${chandrabala}`}>{chandrabala} дом</Link> : null}
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
              readOnly
              className="form-control-plaintext"
              id="moon-next-sign"
              value={formatDateToMinutes(props.info.Raasi.firstSignDate)}
            />
          ) : null}
          {props.info.Raasi.nextSignDate ? (
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="moon-next-sign"
              value={formatDateToMinutes(props.info.Raasi.nextSignDate)}
            />
          ) : null}
          {/* <pre>{JSON.stringify(props.info.Raasi, null,2)}</pre> */}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="nakshatra" className="col-sm-4 col-form-label">
          Накшатра
        </label>
        <div className="col-sm-8">
          <Link className="form-control-plaintext customLink" to={`/nakshatrainfo/${props.info.Nakshatra.index + 1}`}>
            {translateNaks(props.info.Nakshatra.name)}
          </Link>
    
          <div>
          {tarabala?
          <Link  className="form-control-plaintext customLink" to={`/tarabalainfo/${tarabala}`}>
            {" (тарабала: " + tarabala + ")"}
          </Link> : null}
          </div>
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="nakshatra-start"
            value={formatDateToMinutes(props.info.Nakshatra.start)}
          />
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="nakshatra-end"
            value={formatDateToMinutes(props.info.Nakshatra.end)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="tithi" className="col-sm-4 col-form-label">
          Титхи
        </label>
        <div className="col-sm-8">
          <input
            type="tithi"
            readOnly
            className="form-control-plaintext"
            id="tithi"
            value={translateTithi(props.info.Tithi.name)}
          />
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="tithi-start"
            value={formatDateToMinutes(props.info.Tithi.start)}
          />
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="tithi-end"
            value={formatDateToMinutes(props.info.Tithi.end)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="karna" className="col-sm-4 col-form-label">
          Карана
        </label>
        <div className="col-sm-8">
          <input
            type="karna"
            readOnly
            className="form-control-plaintext"
            id="karna"
            value={translateKarana(props.info.Karna.name)}
          />
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="karna-start"
            value={formatDateToMinutes(props.info.Karna.start)}
          />
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="karna-end"
            value={formatDateToMinutes(props.info.Karna.end)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="yoga" className="col-sm-4 col-form-label">
          Йога
        </label>
        <div className="col-sm-8">
          <input
            type="yoga"
            readOnly
            className="form-control-plaintext"
            id="yoga"
            value={translateYoga(props.info.Yoga.name)}
          />
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="yoga-start"
            value={formatDateToMinutes(props.info.Yoga.start)}
          />
          <input
            type="text"
            readOnly
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

import React from 'react';
import translate from '../../lib/Translator';
import { formatDate, formatDateToMinutes } from '../../lib/utils';

const PanchangaInfo = (props) => {
  debugger;
  if (!props.info) {
    return null;
  }
  
    return (
        <div>
        <h2>{formatDate(props.currentDate)}</h2>
        <div>
          <h3>День: {props.info.Day.name}</h3>
        </div>
        <div>
          <h3>Луна: {translate(props.info.Raasi.name)}</h3>
        </div>
        <div>
          <h3>Nakshatra: {props.info.Nakshatra.name}</h3>
          <p>Начало: {formatDateToMinutes(props.info.Nakshatra.start)}</p>
          <p>Конец: {formatDateToMinutes(props.info.Nakshatra.end)}</p>
        </div>
        <div>
          <h3>Tithi: {props.info.Tithi.name}</h3>
          <p>Начало: {formatDateToMinutes(props.info.Tithi.start)}</p>
          <p>Конец: {formatDateToMinutes(props.info.Tithi.end)}</p>
        </div>
        <div>
          <h3>Karna: {props.info.Karna.name}</h3>
          <p>Начало: {formatDateToMinutes(props.info.Karna.start)}</p>
          <p>Конец: {formatDateToMinutes(props.info.Karna.end)}</p>
        </div>
        <div>
          <h3>Yoga: {props.info.Yoga.name}</h3>
          <p>Начало: {formatDateToMinutes(props.info.Yoga.start)}</p>
          <p>Конец: {formatDateToMinutes(props.info.Yoga.end)}</p>
        </div>
        
    </div>
    )
}

export default PanchangaInfo;

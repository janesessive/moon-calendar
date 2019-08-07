import React from 'react';
import translate from '../../lib/Translator';

const PanchangaInfo = (props) => {
    return (
        <div>
        <h2>{props.currentDate.toString()}</h2>
        <label>Луна: </label>
        <span>{translate(props.info.Raasi.name)}</span>
    </div>
    )
}

export default PanchangaInfo;

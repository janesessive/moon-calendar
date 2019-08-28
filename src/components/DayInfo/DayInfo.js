import React, { Component } from 'react';
import { dayData } from "../../lib/dayData";

class DayInfo extends Component {
   
render(){
    const id = this.props.match.params.id;
    if (isNaN(id)) {
        return null;
    }
    const index= id-1;
    if (index < 0 || index > 6) {
        return null;
    }
    const info = dayData[index];
    return (
        <div><h2>{info.title}</h2>
        <p>{info.description}</p>
        </div>
       
    );
}
}

export default DayInfo;
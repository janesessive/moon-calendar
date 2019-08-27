import React, { Component } from 'react';
import { tarabalaData } from "../../lib/tarabalaData";

class TarabalaInfo extends Component {
   
render(){
    const id = this.props.match.params.id;
    if (isNaN(id)) {
        return null;
    }
    const index= id-1;
    if (index < 0 || index > 8) {
        return null;
    }
    const info = tarabalaData[index];
    return (
        <div><h2>{info.title}</h2>
        <p>{info.description}</p>
        </div>
       
    );
}
}

export default TarabalaInfo;
import React, { Component } from 'react';
import { tithiBirthData } from "../../lib/tithiBirthData";

class TithiBirthInfo extends Component {
   
render(){
    const id = this.props.match.params.id;
    if (isNaN(id)) {
        return null;
    }
    const index= id-1;
    if (index < 0 || index > 15) {
        return null;
    }
    const info = tithiBirthData[index];
    return (
        <div><h2>{info.title}</h2>
        <p>{info.description}</p>
        </div>
       
    );
}
}

export default TithiBirthInfo;
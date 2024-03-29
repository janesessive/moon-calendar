import React, { Component } from 'react';
import { houseData } from "../../lib/houseData";

class HouseInfo extends Component {
   
render(){
    const id = this.props.match.params.id;
    if (isNaN(id)) {
        return null;
    }
    const index= id-1;
    if (index < 0 || index > 11) {
        return null;
    }
    const info = houseData[index];
    return (
        <div><h2>{info.title}</h2>
        <p>{info.description}</p>
        </div>
       
    );
}
}

export default HouseInfo;
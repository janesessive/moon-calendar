import React, { Component } from 'react';
import { nakshatraData } from "../../lib/nakshatraData";

class NakshatraInfo extends Component {
   
render(){
    const id = this.props.match.params.id;
    if (isNaN(id)) {
        return null;
    }
    const index= id-1;
    if (index < 0 || index > 26) {
        return null;
    }
    const info = nakshatraData[index];
    return (
        <div><h2>{info.title}</h2>
        <p>{info.description}</p>
        </div>
       
    );
}
}

export default NakshatraInfo;
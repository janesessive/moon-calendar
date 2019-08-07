import React, { Component } from 'react';
import panchang from '../../lib/panchang';
import PanchangaInfo from '../PanchangaInfo/PanchangaInfo';

class Panchanga extends Component {
    state = {
        info: null
    }

    componentDidMount () {
        
        const currentDate = new Date();
        const info = panchang.calculate(currentDate);
        console.log(info);

        this.setState({ info, currentDate });
    }
    render () {
        if (this.state.info === null) {
            return null;
        }
        return (
           
            <PanchangaInfo info={this.state.info} currentDate={this.state.currentDate}/>
        );
    }
}

export default Panchanga;
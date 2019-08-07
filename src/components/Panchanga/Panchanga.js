import React, { Component } from 'react';
import panchang from '../../lib/panchang';

class Panchanga extends Component {
    state = {
        info: null
    }

    componentDidMount () {
        debugger;
        const currentDate = new Date();
        const info = panchang.calculate(currentDate);
        this.setState({ info, currentDate });
    }
    render () {
        if (this.state.info === null) {
            return null;
        }
        return (
            <div>
                <h2>{this.state.currentDate.toString()}</h2>
                <label>Ayanamsa</label>
                <span>{this.state.info.Ayanamsa.name}</span>
            </div>
        );
    }
}

export default Panchanga;
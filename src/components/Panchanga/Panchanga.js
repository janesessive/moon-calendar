import React, { Component } from 'react';
import panchang from '../../lib/panchang';

class Panchanga extends Component {
    componentDidMount () {
        debugger;
        const currentDate = new Date();
        const info = panchang.calculate(currentDate);
        this.setState({ info });
    }
    render () {
        return (
            <div></div>
        );
    }
}

export default Panchanga;
import React, { Component } from 'react';

import './scottieDog.scss';

export default class ScottieDog extends Component {

  render() {
    return (      
        <div className="dog">
            <div className="dog-body"></div>
            <div className="dog-head">
                <div className="dog-eye"></div>
                <div className="dog-nose"></div>
                <div className="dog-ear"></div>
                <div className="dog-collar">GORDON 360</div>
            </div>
            <div className="dog-leg dog-leg1"></div>
            <div className="dog-leg dog-leg2"></div>
            <div className="dog-leg dog-leg3"></div>
            <div className="dog-leg dog-leg4"></div>
            <div className="dog-tail"></div>
        </div>
    );
    }

}

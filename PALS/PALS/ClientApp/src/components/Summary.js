import React, { Component, useState } from 'react';

import BarGraph from '../shared/bar-graph-fruit.svg';
import MLAProfileCard from './MLAProfileCard.js';
import MLASummariesTable from './MLASummariesTable.js';

export class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    render() {
    return (

        <div className="container">
            <div className="row">
                <MLAProfileCard />
            </div>

            <div className="row">
                <MLASummariesTable />
            </div>

            <div className="row">
                <img src={BarGraph} width="450px" />
            </div>
        </div>

    );
    }

}

import React, { Component } from 'react';

import BarGraph from '../shared/bar-graph-fruit.svg';
import MLAProfileCard from './MLAProfileCard.js';

export class Summary extends Component {

    render() {
    return (

        <div className="container">
            <div className="row">
                <MLAProfileCard />
            </div>

            <div className="row summary-card">
                <h4>Summaries:</h4>
                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean tempor libero eget nibh egestas, tempor pellentesque
                        nunc hendrerit. Cras rhoncus tellus ac urna consequat
                        pellentesque.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean tempor libero eget nibh egestas, tempor pellentesque
                        nunc hendrerit. Cras rhoncus tellus ac urna consequat
                    pellentesque.</li>
                </ol>
            </div>

            <div className="row">
                <img src={BarGraph} width="450px" />
            </div>
        </div>

    );
    }
}

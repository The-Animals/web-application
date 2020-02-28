import React, { Component } from 'react';

import MLA from '../shared/carson.jpg';
import BarGraph from '../shared/bar-graph-fruit.svg';

export class Summary extends Component {

    render() {
    return (

        <div className="container">
            <div className="row mla-card">
                <div className="col-sm-3">
                    <img src={MLA} width="120px" height="150px" />
                </div>
                <div className="col-sm">
                    <p>Name: Carson, Member Jon (NDP) <br />
                        Riding: Edmonton-West Henday <br />
                        Legislative Phone #: 780.415.1800 <br />
                        Riding Phone #: 780.414.0711 <br />
                        Email: Edmonton.WestHenday@assembly.ab.ca</p>
                </div>
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

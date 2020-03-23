import React, { Component } from 'react';
import BarGraph from '../shared/bar-graph-fruit.svg';
import FullWidthTabs from './TabPanel.js';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    render() {
      return (
          <div className="container">
              <div className="tabs">
                  <FullWidthTabs />
              </div>
              <div className="row">
                  <img src={BarGraph} alt="Amazing interactive bar graph!" width="450px" />
              </div>
          </div>
      );
    }
}

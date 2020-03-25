import React, { Component } from 'react';
import BarGraph from '../shared/bar-graph-fruit.svg';
import FullWidthTabs from './TabPanel.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
      height: "100%"
    },
    tabs: {
      height: "50%",
      width: "100%",
      paddingBottom: "1%"
    },
    graph: {
      paddingTop: "1%",
      height: "50%",
      width: "100%"
    }
}));


export default function Container() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <div className={classes.tabs}>
            <FullWidthTabs />
        </div>
        <div className={classes.graph}>
            <img src={BarGraph} alt="Amazing interactive bar graph!" width="450px" />
        </div>
    </div>
  );
}

export class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    render() {
      return (
          <Container />
      );
    }
}

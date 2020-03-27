import React, { Component } from 'react';
import FullWidthTabs from './TabPanel.js';
import { makeStyles } from '@material-ui/core/styles';
import InteractiveGraph from './InteractiveGraph.js';

const useStyles = makeStyles(theme => ({
    container: {
      height: "100%"
    },
    tabs: {
      height: "100%",
      width: "100%",
      paddingBottom: "1%"
    },
}));


export default function Container() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <div className={classes.tabs}>
            <FullWidthTabs />
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

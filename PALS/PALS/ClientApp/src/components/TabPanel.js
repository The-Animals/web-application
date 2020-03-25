import React, { Component } from 'react';
import MLAProfileCard from './MLAProfileCard.js';
import MLASummariesTable from './MLASummariesTable.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function createDynamicProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0} height={"100%"}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
    root: {
      height: "100%"
    },
    bar: {
      height: "15%"
    },
    panel: {
      height: "85%",
      width: "100%"
    },
    profile: {
      height: "100%",
      width: "100%"
    },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          height="100%"
        >
          <Tab label="MLA Info" {...createDynamicProps(0)} />
          <Tab label="Summaries" {...createDynamicProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction} className={classes.panel}>
        <MLAProfileCard />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction} className={classes.panel}>
        <MLASummariesTable />
      </TabPanel>
    </div>
  );
}

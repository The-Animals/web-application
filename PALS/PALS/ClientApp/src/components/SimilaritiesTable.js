import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import MLA from '../shared/carson.jpg';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MLAProfileCard from './MLAProfileCard.js';
import SimilarProfileCard from './MLAProfileCard.js';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: "100%"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    content: {
        flex: '1 0 auto',
    },
    pos: {
        marginBottom: 12,
    },
    info: {
        marginBottom: 5,
    },
    img: {
        marginTop: 10,
        marginLeft: 10,
        width: 120,
        height: 150,
    },
    partyButton: {
        color: 'white',
        backgroundColor: '#F58220'
    }
});

export default function SimilaritiesTable() {

    // var mlaId = parseInt(props.mla.mlaId) || 1;
    // const classes = useStyles();
    //
    // const [MLAData, setMLAData] = useState({});
    // useEffect(() => {
    //     async function getMLAData() {
    //         const MLAData = await getData('api/GetSimilarMLA');
    //         setMLAData(MLAData);
    //     }
    //     getMLAData();
    // }, [mlaId]);

    return (
      <Paper style={{maxHeight: '100%', overflow: 'auto', padding: 10}}>
        <List>
          <div style={{paddingBottom: 10, paddingTop: 10}}>
            <h1>Most Similar</h1>
            <MLAProfileCard type='similar' />
          </div>
          <div style={{paddingBottom: 10, paddingTop: 10}}>
            <h1>Most Different</h1>
            <MLAProfileCard type='different' />
          </div>
        </List>
      </Paper>
    );
}

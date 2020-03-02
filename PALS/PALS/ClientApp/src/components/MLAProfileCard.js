import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MLA from '../shared/carson.jpg';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 525,
        display: 'flex',
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

async function getData(url = '', params = {}) {

    if (params) { url += "?" + convertObjectToParams(params); }

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client            
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function convertObjectToParams(input) {

    var output = [];
    Object.keys(input).forEach(function (key) {
        output.push(key + "=" + input[key]);
    });
    return output.join("&");

}

export default function MLAProfileCard() {
    const classes = useStyles();

    const [MLAData, setMLAData] = useState({});
    useEffect(() => {
        async function getMLAData() {
            const MLAData = await getData('MLA', { RidingID: 49 });
            setMLAData(MLAData);
            console.log(MLAData);
        }
        getMLAData();        
    }, []);    

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.img}
                image={MLA}
                title="Carson, Member Jon (NDP)"
            />
            <div className={classes.details}>
                <CardContent>
                    <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
                        {MLAData.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {MLAData.riding}
                    </Typography>
                    <Typography className={classes.info} variant="body2" component="p">
                        Phone #:  <br />
                                {MLAData.constituencyPhone} (Constituency Office) <br />                       
                                {MLAData.legislaturePhone}  (Legislature Office) <br />
                    </Typography>
                    <Typography className={classes.info} variant="body2" component="p">
                        Email:  <br />
                        {MLAData.email}
                    </Typography>
                </CardContent>
                <CardActions>                    
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button className={classes.partyButton} size="small">{MLAData.party}</Button>
                    </Grid>
                </CardActions>
            </div>
        </Card>
    );

}
import React from 'react';

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

export default function MLAProfileCard() {
    const classes = useStyles();

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
                        Carson, Member Jon 
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Edmonton-West Henday
                    </Typography>
                    <Typography className={classes.info} variant="body2" component="p">
                        Phone #:  <br />
                                 780.415.1800 (Constituency Office) <br />                       
                                 780.414.0711 (Legislature Office) <br />
                    </Typography>
                    <Typography className={classes.info} variant="body2" component="p">
                        Email:  <br />
                        Edmonton.WestHenday@assembly.ab.ca
                    </Typography>
                </CardContent>
                <CardActions>                    
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button className={classes.partyButton} size="small">NDP</Button>
                    </Grid>
                </CardActions>
            </div>
        </Card>
    );
}
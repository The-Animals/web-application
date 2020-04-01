import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Default_MLA from '../shared/Default_MLA.jpg';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => {
    return { mla: state.mla,
             mlas: state.mlas
           };
};

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

function MLAProfileCard(props) {
    const classes = useStyles();

    const getImage = mla =>  {
        if (Object.keys(mla).length === 0)
        {
            return Default_MLA;
        }
        else
        {
            var replaced = mla.name.split(' ').join('_');
            return 'http://162.246.157.124/'+ replaced + '.jpg';
        }
    }

    var mla;

    if (props.type === 'similar') {
      mla = props.mlas.filter(mla => props.mla.similar === mla.id)[0];
    } else if (props.type === 'different') {
      mla = props.mlas.filter(mla => props.mla.different === mla.id)[0];
    } else {
      mla = props.mla;
    };

    return (
        <Card className={classes.root} id="testing">
            <CardMedia
                className={classes.img}
                image={getImage(mla)}
                title={mla.name}
            />
            <div className={classes.details}>
                <CardContent>
                    <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
                        {mla.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {mla.riding}
                    </Typography>
                    <Typography className={classes.info} variant="body2" component="p">
                        Phone #:  <br />
                                {mla.constituencyPhone} (Constituency Office) <br />
                                {mla.legislaturePhone}  (Legislature Office) <br />
                    </Typography>
                    <Typography className={classes.info} variant="body2" component="p">
                        Email:  <br />
                        {mla.email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button className={classes.partyButton} size="small">{mla.party || ""}</Button>
                    </Grid>
                </CardActions>
            </div>
        </Card>
    );
}

export default connect(mapStateToProps)(MLAProfileCard);

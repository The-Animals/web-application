import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { getData } from '../services/AjaxService.js';

import { updateSearchResults } from '../actions/index.js';

const mapDispatchToProps = dispatch => {
    return {
        updateSearchResults: results => dispatch(updateSearchResults(results))
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

function SearchWithFilters(props) {
    const classes = useStyles();
    const reloadMlas = false;

    const [MLAs, setMLAsData] = useState([]);
    useEffect(() => {
        async function getAllMLAsData() {
            const MLAs = await getData('api/GetAllMLAs');
            setMLAsData(MLAs);            
        }
        getAllMLAsData();
    }, [reloadMlas]); // Avoid spamming server to reload MLAs

    const ridings = [
        {
            value: 'edmonton-west-henday',
            label: 'Edmonton-West Henday',
        },
        {
            value: 'edmonton-beverly-clareview',
            label: 'Edmonton-Beverly-Clareview',
        }
    ];

    const [riding, setRiding] = useState('edmonton-west-henday');
    const handleRidingChange = event => {
        setRiding(event.target.value);
    };
    
    const [mla, setMla] = useState(0);
    const handleMlaChange = event => {        
        setMla(event.target.value);        
    };
    
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async function () {
        const results = await getData(
            'api/GetSummaryWithFilter',
            { ridingNumber: mla }
        );
        setSearchResults(results);
        props.updateSearchResults({ results });        
    } 

    // TODO: Replace native date pickers with material-ui/pickers
    return (
        <div className={classes.root}>
        <TextField 
            fullWidth
            className={classes.root}
            id="standard-search"
            label="Search field"
            type="search" />

        <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className={classes.button}
            endIcon={<SearchIcon />}
        >
            Search
        </Button>

        <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={riding}
            onChange={handleRidingChange}
            helperText="Please select a riding"
        >
            {ridings.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>

        <TextField
            id="standard-select-mla"
            select
            label="Select"
            value={mla}
            onChange={handleMlaChange}
            helperText="Please select an MLA"
        >
            {MLAs.map(option => (
                <MenuItem key={option.ridingNumber} value={option.ridingNumber}>
                    {option.name}
                </MenuItem>
            ))}
        </TextField>

        <TextField
            id="startDate"
            label="From Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />

        <TextField
            id="endDate"
            label="To Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />

        </div>
    );

}

export default connect(null, mapDispatchToProps)(SearchWithFilters);
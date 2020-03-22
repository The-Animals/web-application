import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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

    // TODO: Prefetch ALL mla data on home page.
    const [MLAs, setMLAsData] = useState([]);
    useEffect(() => {
        async function getAllMLAsData() {
            const MLAs = await getData('api/mla/all');
            setMLAsData(MLAs);      
        }
        getAllMLAsData();        
    }, [reloadMlas]); // Avoid spamming server to reload MLAs
    
    const [mla, setMla] = useState(0);
    const handleMlaChange = event => {        
        setMla(event.target.value);        
    };

    const [query, setQuery] = useState("");
    const handleQueryChange = event => {
        setQuery(event.target.value);
    };

    const [startDate, setStartDate] = useState("2019-01-01");
    const handleStartDateChange = event => {
        setStartDate(event.target.value);
    };

    const [endDate, setEndDate] = useState("2020-04-01");
    const handleEndDateChange = event => {
        setEndDate(event.target.value);
    };

    const [party, setParty] = useState("ALL");
    const handlePartyChange = (event, newParty) => {
        if (newParty !== null) {
            setParty(newParty);
        }
    };

    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async function () {
        //const results = await getData(
        //    'api/GetSummaryWithFilter',
        //    {
        //        RidingNumber: mla,
        //        Query: query,
        //        StartDate: startDate,
        //        EndDate: endDate,
        //        Caucus: party
        //    }
        //);
        //setSearchResults(results);
        //props.updateSearchResults({ results });        
    } 

    // TODO: Replace native date pickers with material-ui/pickers
    return (
        <div className="container">

            <ToggleButtonGroup size="large" value={party} exclusive onChange={handlePartyChange}>
                <ToggleButton key={1} value="NDP">
                    NDP
                </ToggleButton>
                <ToggleButton key={2} value="UCP">
                    UCP
                </ToggleButton>
                <ToggleButton key={3} value="AB">
                    AB
                </ToggleButton>
                <ToggleButton key={4} value="ALL">
                    All
                </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.root}>
            <TextField 
                fullWidth
                className={classes.root}
                id="standard-search"
                label="Search field"
                onChange={handleQueryChange}
                value={query}
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
                value={mla}
                onChange={handleMlaChange}
                helperText="Please select a riding"
            >
                {MLAs.map(option => (
                    <MenuItem key={option.ridingNumber} value={option.ridingNumber}>
                        {option.riding}
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
                defaultValue={startDate}
                onChange={handleStartDateChange}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                id="endDate"
                label="To Date"
                type="date"
                defaultValue={endDate}            
                onChange={handleEndDateChange}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </div>

        </div>
    );

}

export default connect(null, mapDispatchToProps)(SearchWithFilters);
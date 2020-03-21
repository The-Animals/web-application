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

    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async function () {
        const results = await getData(
            'api/GetSummaryWithFilter',
            {
                RidingNumber: mla,
                Query: query,
                StartDate: startDate,
                EndDate: endDate
            }
        );
        setSearchResults(results);
        props.updateSearchResults({ results });        
    } 

    // TODO: Replace native date pickers with material-ui/pickers
    return (
        <div className="container">

            <div className="row">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary">UCP</button>
                    <button type="button" className="btn btn-secondary">NDP</button>
                    <button type="button" className="btn btn-secondary">AB</button>
                    <button type="button" className="btn btn-secondary">All</button>
                </div>
            </div>

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
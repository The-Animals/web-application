import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { updateSummaryFilter } from '../actions/index.js';

const mapStateToProps = state => {
    return {
        mlas: state.mlas
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaryFilter: filter => dispatch(updateSummaryFilter(filter))        
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

    useEffect(() => {
        handleSearch();
    }, [query, mla, party, startDate, endDate]);

    const handleSearch = function () {
        props.updateSummaryFilter({
            mlaId: mla,
            caucus: party,
            startDate: startDate,
            endDate: endDate,
            query: query,
        });   
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
                <ToggleButton key={3} value="ALL">
                    All
                </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.root}>
            <TextField                 
                className={classes.root}
                id="standard-search"
                label="Search field"
                onChange={handleQueryChange}
                value={query}
                type="search" />

            <TextField
                id="standard-select-riding"
                select
                label="Select"
                value={mla}
                onChange={handleMlaChange}
                helperText="Please select a riding"
            >
                {props.mlas.map(option => (
                    <MenuItem key={option.id} value={option.id}>
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
                {props.mlas.map(option => (
                    <MenuItem key={option.id} value={option.id}>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SearchWithFilters);
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { updateSummaryFilter } from '../actions/summaryTableActions';

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

function filterMLAsByParty(mlas, party) {    

    if (party === "ALL") return mlas;

    return mlas.filter(function (mla) {
        // If mla party matches filter or mla has no associated party.
        return mla.party === party || !mla.party;
    });
}

// TODO: Maybe it would be better for the endpoint to return a dictionary.
function mapMlasToObject(mlas) {

    return mlas.reduce(function (map, obj) {
        map[obj.id] = obj;
        return map;
    }, {});

}

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

        var mlas = mapMlasToObject(props.mlas);
        var selectedMLA = mlas[mla];  

        if (newParty !== "ALL" && selectedMLA.party !== newParty) {            
            setMla(props.mlas[0].id);
        }
    };
   
    var filteredMLAs = filterMLAsByParty(props.mlas, party);

    useEffect(() => {
        const timeOutId = setTimeout(() =>
            props.updateSummaryFilter({
                mlaId: mla,
                caucus: party,
                startDate: startDate,
                endDate: endDate,
                query: query,
            }),
            500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        props.updateSummaryFilter({
            mlaId: mla,
            caucus: party,
            startDate: startDate,
            endDate: endDate,
            query: query,
        });     
    }, [mla, party, startDate, endDate]);

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
                {filteredMLAs.map(option => (
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
                {filteredMLAs.map(option => (
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
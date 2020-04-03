import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
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

    const [startDate, setStartDate] = useState(new Date("Tue Jan 01 2019 00:00:00"));
    const handleStartDateChange = event => {
        setStartDate(new Date(event));
    };

    const [endDate, setEndDate] = useState(new Date("Wed Apr 01 2020 00:00:00"));
    const handleEndDateChange = event => {
        setEndDate(new Date(event));
    };

    const [party, setParty] = useState("ALL");
    const handlePartyChange = (event, newParty) => {        

        if (newParty !== null) {
            setParty(newParty);           

            var mlas = mapMlasToObject(props.mlas);
            var selectedMLA = mlas[mla];

            if (newParty !== "ALL" && selectedMLA.party !== newParty) {
                setMla(props.mlas[0].id);
            }
        }

    };
   
    var filteredMLAs = filterMLAsByParty(props.mlas, party);

    useEffect(() => {
        const timeOutId = setTimeout(() =>
            props.updateSummaryFilter({
                mlaId: mla,
                caucus: party,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                query: query,
            }),
            500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        props.updateSummaryFilter({
            mlaId: mla,
            caucus: party,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            query: query,
        });     
    }, [mla, party, startDate, endDate]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="startDate"
                label="From Date"
                maxDate={endDate}
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />

            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="endDate"
                label="To Date"
                minDate={startDate}
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />

            </div>

        </div>
        </MuiPickersUtilsProvider>
    );

}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SearchWithFilters);
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { getData } from '../services/AjaxService.js';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

export default function SearchWithFilters() {
    const classes = useStyles();

    const [MLAs, setMLAsData] = useState([]);
    useEffect(() => {
        async function getAllMLAsData() {
            const MLAs = await getData('api/GetAllMLAs');
            setMLAsData(MLAs);
            console.log(MLAs);
        }
        getAllMLAsData();
    });

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

    const [riding, setRiding] = React.useState('edmonton-west-henday');

    const handleRidingChange = event => {
        setRiding(event.target.value);
    };


    // TODO: Replace native date pickers with material-ui/pickers
    return (
        <div className={classes.root}>
        <TextField 
            fullWidth
            className={classes.root}
            id="standard-search"
            label="Search field"
            type="search" />

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
            value={riding}
            onChange={handleRidingChange}
            helperText="Please select an MLA"
        >
            {MLAs.map(option => (
                <MenuItem key={option.name} value={option.name}>
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
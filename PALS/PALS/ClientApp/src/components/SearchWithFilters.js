import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

export default function SearchWithFilters() {
    const classes = useStyles();

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

    const mlas = [
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
    const [mla, setMLA] = React.useState('edmonton-west-henday');

    const handleRidingChange = event => {
        setRiding(event.target.value);
    };

    const handleMLAChange = event => {
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
            id="standard-select-currency"
            select
            label="Select"
            value={riding}
            onChange={handleRidingChange}
            helperText="Please select an MLA"
        >
            {ridings.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
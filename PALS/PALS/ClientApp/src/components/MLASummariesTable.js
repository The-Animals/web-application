import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getData } from '../services/AjaxService.js';

const mapStateToProps = state => {
    return { mla: state.mla };
};

const useStyles = makeStyles({
    table: {
        minWidth: 525,
    },
});

function createData(summaryRank, summary) {
    return { summaryRank, summary };
}

const rows = [
    createData("1", "Test summary")
];

function MLASummariesTable(props) {

    const mlaId = parseInt(props.mla.mlaId) || 1; 
    const classes = useStyles();

    const [MLASummaries, setMLASummaries] = useState({});
    useEffect(() => {
        async function getMLASummaries() {
            const MLASummaries = await getData('MLA', { RidingID: mlaId });
            setMLASummaries(MLASummaries);
        }
        getMLASummaries();
    }, [mlaId]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>Summaries</TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.summaryRank}>
                            <TableCell align="left">
                                {row.summaryRank}
                            </TableCell>  
                            <TableCell align="left">
                                {row.summary}
                            </TableCell>                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default connect(mapStateToProps)(MLASummariesTable);

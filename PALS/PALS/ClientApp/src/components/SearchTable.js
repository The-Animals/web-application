import React from 'react';
import { connect } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MLA from '../shared/carson.jpg';

const mapStateToProps = state => {
    return {
        summaries: state.summaries,
        summaryFilter: state.summaryFilter
    };
};

const PersonTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        width: 150,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const generateKey = (result) => {
    return result.mlaRank + '_' + result.mlaId;
};

function processSummaryFilter(filter, summaries) {
    return summaries.filter(function (summary) {

        // Sort mlaIds
        if (filter.mlaId &&
            (filter.mlaId != summary.mlaId)) return false;

        // TODO: This will have to change to use MLAIds to find
        // their caucuses and compare if they match. After we
        // implement prefetching MLAs.

        // Sort caucus
        if (filter.caucus &&
            (filter.caucus != "ALL" &&
             filter.caucus != summary.caucus)) return false;

        // Sort dates
        const summaryDate = new Date(summary.documentDate);
        if (filter.startDate) {
            const startDate = new Date(filter.startDate);
            if (summaryDate < startDate) return false;
        }

        if (filter.endDate) {
            const endDate = new Date(filter.endDate);
            if (summaryDate > endDate) return false;
        }

        // Sort query
        if (filter.query) {
            const query = filter.query.toLowerCase();
            const summaryText = summary.text.toLowerCase();
            if (!summaryText.includes(query)) return false;
        }            

        return true;

    });    
}

function SearchTable(props) {
    const classes = useStyles();

    const summaries = props.summaries;
    const filteredSummaries = processSummaryFilter(props.summaryFilter, summaries);

    const mlaRows = filteredSummaries.map(result =>
        <TableRow key={generateKey(result)}>
            <PersonTableCell component="th" scope="row">
                <img src={MLA} width="120px" height="150px" />
            </PersonTableCell>
            <TableCell align="left">
                {result.text}
            </TableCell>
        </TableRow>
    );

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Person</TableCell>
                        <TableCell align="left">Summary</TableCell>                    
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mlaRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default connect(mapStateToProps)(SearchTable);

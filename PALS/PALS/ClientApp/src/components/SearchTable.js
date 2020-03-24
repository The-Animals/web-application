import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import MLA from '../shared/carson.jpg';
import { updateSummaryOffset } from '../actions';

const mapStateToProps = state => {
    return {
        summaries: state.summaries,
        summaryFilter: state.summaryFilter,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSummaryOffset: offset => dispatch(updateSummaryOffset(offset))
    };
}

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

function generateMlaRows(filteredSummaries, loading, sliceStart, sliceEnd) {

    if (loading) {
        return (
            <TableRow>
                <TableCell align="left">
                    {"Loading..."}
                </TableCell>
            </TableRow>
        );
    }

    if (filteredSummaries.length == 0) {
        return (
            <TableRow>
                <TableCell align="left">
                    {"No results found."}
                </TableCell>
            </TableRow>
        );
    }

    return filteredSummaries
        .slice(sliceStart, sliceEnd)
        .map(result =>
            <TableRow key={generateKey(result)}>
                <PersonTableCell component="th" scope="row">
                    <img src={MLA} width="120px" height="150px" />
                </PersonTableCell>
                <TableCell align="left">
                    {result.text}
                </TableCell>
            </TableRow>
        );
}

function SearchTable(props) {
    const classes = useStyles();

    const summaries = props.summaries;
    const filteredSummaries = processSummaryFilter(props.summaryFilter, summaries);

    if (summaries.length > 0 &&
        filteredSummaries.length == 0 &&
        !props.loading) {

        props.updateSummaryOffset(1001);        
    }        

    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const mlaRows = generateMlaRows(
        filteredSummaries,
        props.loading,
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage);

    return (
        <Paper>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSummaries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <TableContainer>
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
        </Paper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

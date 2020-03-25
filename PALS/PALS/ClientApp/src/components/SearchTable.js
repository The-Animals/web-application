import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function descendingDateComparator(a, b, orderBy) {
    const dateA = new Date(a[orderBy]);
    const dateB = new Date(b[orderBy]);

    if (dateB < dateA) {
        return -1;
    }
    if (dateB > dateA) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {

    // TODO: Can be improved by adding a "type" field to the header,
    // which is passed to getComparator() which performs a select-case
    // depending on type.
    if (orderBy === "date") {
        return order === 'desc'
            ? (a, b) => descendingDateComparator(a, b, orderBy)
            : (a, b) => -descendingDateComparator(a, b, orderBy);
    }

    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {

    // For PartyRank, need to filter out -1 values from array
    // so they aren't sorted.
    const filteredOutElements = array.filter(function (el) {
        return el.partyRank === -1;
    });
    const filteredElements = array.filter(x => !filteredOutElements.includes(x));   

    const stabilizedThis = filteredElements.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });    

    // Append the filtered out elements again.
    return stabilizedThis.map(el => el[0]).concat(filteredOutElements);
}

const headCells = [
    { id: 'person', sortable: false, alignRight: false, disablePadding: false, label: 'Person' },
    { id: 'mlaRank', sortable: true, alignRight: false, disablePadding: false, label: 'MLA Rank' },
    { id: 'partyRank', sortable: true, alignRight: false, disablePadding: false, label: 'Party Rank' },
    { id: 'documentDate', sortable: true, alignRight: false, disablePadding: false, label: 'Date' },
    { id: 'summary', sortable: false, alignRight: false, disablePadding: false, label: 'Summary' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    headCell.sortable ?
                        <TableCell
                            key={headCell.id}
                            align={headCell.alignRight ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                        :
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const generateKey = (result) => {
    return result.mlaRank + '_' + result.mlaId;
};

function processSummaryFilter(filter, summaries) {
    return summaries.filter(function (summary) {

        // Sort mlaIds
        if (filter.mlaId &&
            (filter.mlaId !== summary.mlaId)) return false;

        // Sort caucus
        if (filter.caucus &&
            (filter.caucus !== "ALL" &&
             filter.caucus !== summary.caucus)) return false;

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

function generateMlaRows(filteredSummaries, loading, sliceStart, sliceEnd, order, orderBy) {

    if (loading) {
        return (
            <TableRow>
                <TableCell>
                    <Skeleton variant="rect" width={150} height={200} />
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                    <Skeleton animation="wave" width={400} />
                    <Skeleton animation="wave" width={400} />
                    <Skeleton animation="wave" width={400} />
                </TableCell>
            </TableRow>
        );
    }

    if (filteredSummaries.length === 0) {
        return (
            <TableRow>
                <TableCell align="left">
                    {"No results found."}
                </TableCell>
            </TableRow>
        );
    }

    return stableSort(filteredSummaries, getComparator(order, orderBy))
        .slice(sliceStart, sliceEnd)
        .map(result =>
            <TableRow key={generateKey(result)}>
                <PersonTableCell component="th" scope="row">
                    <img src={MLA} alt={result.name} width="120px" height="150px" />
                    {result.name}
                </PersonTableCell>
                <TableCell>
                    {result.mlaRank}
                </TableCell>
                <TableCell>
                    {result.partyRank === -1 ? "N/A" : result.partyRank}
                </TableCell>
                <TableCell>
                    {new Date(result.documentDate).toLocaleDateString('en-US')}
                </TableCell>
                <TableCell align="left">
                    {result.text}
                </TableCell>
            </TableRow>
        );
}

function SearchTable(props) {
    const classes = useStyles();

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('rank');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);        
    };

    const summaries = props.summaries;
    const filteredSummaries = processSummaryFilter(props.summaryFilter, summaries);

    if (summaries.length > 0 &&
        filteredSummaries.length === 0 &&
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

    // Move back the page number back to new maximum if 
    // there are less filtered summaries now.
    if (page * rowsPerPage > filteredSummaries.length) {
        const newMax = Math.floor(filteredSummaries.length / rowsPerPage);
        setPage(newMax);
    }

    const mlaRows = generateMlaRows(
        filteredSummaries,
        props.loading,
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
        order,
        orderBy);

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
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {mlaRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

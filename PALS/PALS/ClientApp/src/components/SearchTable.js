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
    return { searchResults: state.searchResults };
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

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function SearchTable(props) {
    const classes = useStyles();

    console.log("Here be props: ", props);

    const searchResults = props.searchResults;

    const mlaRows = searchResults.map(result =>
        <TableRow key={result.mlaRank}>
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

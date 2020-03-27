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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TablePagination from '@material-ui/core/TablePagination';
import clsx from 'clsx';


const mapStateToProps = state => {
    return { 
        mlaSummaries: state.mlaSummaries
    };
};

const useStyles = makeStyles({
    table: {
        width: 'auto',
        height: '100%',
    },
    paper: {
        height: '100%'
    },
    container: {
        height: '82%'
    }
});

function MLASummariesTable(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 18,
      },
    }))(TableCell);

    return (
        <Paper className={classes.paper}>
          <TableContainer component={Paper} className={classes.container}>
              <Table className={classes.table} stickyHeader aria-label="sticky table">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                      {props.mlaSummaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                          <TableRow key={row.mlaRank} className={classes.row}>
                              <TableCell align="left">
                                  {row.mlaRank}
                              </TableCell>
                              <TableCell align="left">
                                  {row.text}
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 2, 3, 4, 5]}
            component="div"
            count={props.mlaSummaries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            className = {classes.pagination}
            height="18%"
          />
        </Paper>
    );
}

export default connect(mapStateToProps)(MLASummariesTable);

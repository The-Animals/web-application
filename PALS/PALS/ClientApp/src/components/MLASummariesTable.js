import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
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

import { getData } from '../services/AjaxService.js';

const mapStateToProps = state => {
    return { mla: state.mla };
};

const useStyles = makeStyles({
    table: {
        maxWidth: 525,
    },
});

function MLASummariesTable(props) {

    const mlaId = parseInt(props.mla.mlaId) || 1;
    const classes = useStyles();

    const [MLASummaries, setMLASummaries] = useState([]);
    useEffect(() => {
        async function getMLASummaries() {
            const MLASummaries = await getData('api/summary/mla/' + mlaId + '/500');
            setMLASummaries(MLASummaries);
            console.log(MLASummaries);
        }
        getMLASummaries();
    }, [mlaId]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                        <TableCell align='center' colspan='2'>
                          Summaries
                        </TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {MLASummaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                          <TableRow key={row.mlaRank}>
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
            count={MLASummaries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
    );
}

export default connect(mapStateToProps)(MLASummariesTable);

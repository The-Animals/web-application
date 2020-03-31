import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const mapStateToProps = state => {
    return { 
        mlaSummaries: state.mlaSummaries,
        mlaSummaryDateFilter: state.mlaSummaryDateFilter
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
    const [rowsPerPage, setRowsPerPage] = React.useState(1);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const filterSummaries = summaries => { 
        if (props.mlaSummaryDateFilter.length === 0) 
        {
            return summaries;
        }
        else 
        { 
            return summaries.filter(s => {
                const sDate = new Date(s.documentDate).getTime();
                return props.mlaSummaryDateFilter.includes(sDate);
            });
        }
    }

    var summaries = filterSummaries(props.mlaSummaries);

    return (
        <Paper className={classes.paper}>
          <TableContainer component={Paper} className={classes.container}>
              <Table className={classes.table} stickyHeader aria-label="sticky table">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                      {summaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
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
            count={summaries.length}
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

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MLA from '../shared/carson.jpg';

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

function createData(name, profileImage, summary) {
    return { name, profileImage, summary };
}

const rows = [
    createData("Carson, Member Jon", MLA, "Test summary")
];

export default function SearchTable() {
    const classes = useStyles();

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
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <PersonTableCell component="th" scope="row">
                                <img src={row.profileImage} width="120px" height="150px" />
                            </PersonTableCell>
                            <TableCell align="left">
                                <ol>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean tempor libero eget nibh egestas, tempor pellentesque
                                        nunc hendrerit. Cras rhoncus tellus ac urna consequat
                                        pellentesque.</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean tempor libero eget nibh egestas, tempor pellentesque
                                        nunc hendrerit. Cras rhoncus tellus ac urna consequat
                                    pellentesque.</li>
                                    ...
                                </ol>
                            </TableCell>                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

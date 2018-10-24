import React from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// component imports
import CompletedSessionsTableRow from './CompletedSessionsTableRow';

const mapStateToProps = state => ({
    completedSessions: state.sessions.completedSessions
});//end mapStateToProps

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};//end desc

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};//end stableSort

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};//end getSorting

class CompletedSessionsTable extends React.Component {
    state = {
        page: 0,
        rowsPerPage: 5,
    };//end state

    componentDidMount = () => {
        this.getCompletedSessions();
    };//end componentDidMount

    getCompletedSessions = () => {
        this.props.dispatch({type: 'GET_COMPLETED_SESSIONS'});
    };//end getCompletedSessions

    handleChangePage = (event, page) => {
        this.setState({ page });
    };//end handleChangePage

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };//end handleChangeRowsPerPage

    render() {
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.completedSessions.length - page * rowsPerPage);

        return (
            <Paper>
                <div>
                    <Table aria-labelledby="tableTitle">
                        <TableHead style={{backgroundColor: '#F5F5F5', color: 'red'}}>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>School</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Subtopic</TableCell>
                                <TableCell>Total Time</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(this.props.completedSessions, getSorting())
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    // const isSelected = this.isSelected(n.id);
                                    return (
                                        <CompletedSessionsTableRow key={n.id} n={n} />
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={this.props.completedSessions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    };//end render
};//end CompletedSessionsTable

export default connect(mapStateToProps)(CompletedSessionsTable);
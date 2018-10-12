import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// moment.js imports
import moment from 'moment';
// component imports
import EndSessionDialog from './EndSessionDialog';

const mapStateToProps = state => ({
    activeSessions: state.sessions.activeSessions
});

class ActiveSessionsTable extends Component {
   componentDidMount = () => {
        this.getActiveSessions();
    }

    getActiveSessions = () => {
        console.log('in getActiveSessions');
        // Axios({
        //     method: 'GET',
        //     url: '/sessions/active',
        // }).then((response) => {
        //     console.log('back from /sessions/active with: ', response.data);
        //     this.setState({
        //         activeSessions: response.data,
        //     });
        // }).catch((error) => {
        //     console.log('/sessions/active error: ', error);
        //     alert('there was a problem getting the active sessions');
        // })
        this.props.dispatch({type: 'GET_ACTIVE_SESSIONS'});
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>School</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.activeSessions.map(session => {
                            return (
                                <TableRow key={session.id}>
                                    <TableCell component="th" scope="row">
                                        {session.student_name}
                                    </TableCell>
                                    <TableCell>{session.school_name}</TableCell>
                                    <TableCell>{session.grade_level}</TableCell>
                                    <TableCell>{moment(session.start_time, 'HH:mm:ss.SSSSSS').format('h:mm a')}</TableCell>
                                    <TableCell>
                                        <EndSessionDialog id={session.id} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default connect(mapStateToProps)(ActiveSessionsTable);
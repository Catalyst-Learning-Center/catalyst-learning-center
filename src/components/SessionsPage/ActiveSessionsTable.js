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
        this.props.dispatch({type: 'GET_ACTIVE_SESSIONS'});
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead style={{backgroundColor: '#F5F5F5'}}>
                        <TableRow>
                            <TableCell style={{color: 'black', size: '20px'}}>Name</TableCell>
                            <TableCell style={{color: 'black', size: '20px'}}>School</TableCell>
                            <TableCell style={{color: 'black', size: '20px'}}>Grade</TableCell>
                            <TableCell style={{color: 'black', size: '20px'}}>Start Time</TableCell>
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
                                        <EndSessionDialog 
                                        date={session.session_date} 
                                        id={session.id} 
                                        start_time={session.start_time}
                                        />
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
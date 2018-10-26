import React, { Component } from 'react';
import moment from 'moment';
// Material UI imports
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// component imports
import EditSessionDialog from './EditSessionDialog';

class CompletedSessionsTableRow extends Component {
    render() {
        let time = null;
        if (this.props.n.time.hours > 0 && this.props.n.time.minutes == null) {
            time = (this.props.n.time.hours * 60);
        } else if (this.props.n.time.hours > 0) {
            time = (this.props.n.time.hours * 60) + this.props.n.time.minutes;
        } else {
            time = this.props.n.time.minutes;
        };//end else if

        return (
            <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                >
                    <TableCell padding="checkbox">
                        {moment(this.props.n.session_date).format('MM/DD/YY')}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                        {this.props.n.student_name}
                    </TableCell>
                    <TableCell>{this.props.n.school_name}</TableCell>
                    <TableCell>{this.props.n.grade_level}</TableCell>
                    <TableCell>{this.props.n.subjects}</TableCell>
                    <TableCell>{this.props.n.topics}</TableCell>
                    <TableCell>{time} minutes</TableCell>
                    <TableCell>
                        <EditSessionDialog 
                        session={this.props.n} 
                        time={time}
                        />
                    </TableCell>
                </TableRow>
        )
    };//end render
};//end CompletedSessionsTableRow Component

export default CompletedSessionsTableRow;
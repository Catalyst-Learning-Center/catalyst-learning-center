import React, { Component } from 'react';
import moment from 'moment';
// Material UI imports
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button, Input } from '@material-ui/core';

class CompletedSessionsTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }
    render() {
        let content = null;

        if (this.state.editing) {
            content = (
                <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={this.props.n.id}
                >
                    <TableCell padding="checkbox">
                        <Input type="date">{moment(this.props.n.session_date).format('MM/DD/YY')}</Input>
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                        {this.props.n.student_name}
                    </TableCell>
                    <TableCell numeric>{this.props.n.school_name}</TableCell>
                    <TableCell numeric>{this.props.n.grade_level}</TableCell>
                    <TableCell numeric>{this.props.n.subjects}</TableCell>
                    <TableCell numeric>{this.props.n.topics}</TableCell>
                    <TableCell numeric>{moment(this.props.n.time).format('h:mm:ss')}</TableCell>
                    <TableCell>
                        <Button>Edit</Button>
                    </TableCell>
                </TableRow>
            )
        } else {
            content = (
                <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={this.props.n.id}
                >
                    <TableCell padding="checkbox">
                        {moment(this.props.n.session_date).format('MM/DD/YY')}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                        {this.props.n.student_name}
                    </TableCell>
                    <TableCell numeric>{this.props.n.school_name}</TableCell>
                    <TableCell numeric>{this.props.n.grade_level}</TableCell>
                    <TableCell numeric>{this.props.n.subjects}</TableCell>
                    <TableCell numeric>{this.props.n.topics}</TableCell>
                    <TableCell numeric>{moment(this.props.n.time).format('h:mm:ss')}</TableCell>
                    <TableCell>
                        <Button>Edit</Button>
                    </TableCell>
                </TableRow>
            )
        }

        return (
            {content}
        )
    }
}

export default CompletedSessionsTableRow;
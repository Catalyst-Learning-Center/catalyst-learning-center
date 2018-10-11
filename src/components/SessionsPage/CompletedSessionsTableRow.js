import React, { Component } from 'react';
import moment from 'moment';
// Material UI imports
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button, Input, TextField } from '@material-ui/core';

class CompletedSessionsTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            session: {
                session_date: this.props.n.session_date,
                student_name: this.props.n.student_name,
                school_name: this.props.n.school_name,
                grade_level: this.props.n.grade_level,
                subjects: this.props.n.subjects,
                topics: this.props.n.topics,
                time: this.props.n.time
            }
        }
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing,
        })
    }

    render() {
        let content = null;

        if (this.state.editing) {
            content = (
                <div>
                    <TableCell padding="checkbox">
                        {/* <Input type="date">{moment(this.props.n.session_date).format('MM/DD/YY')}</Input> */}
                        <TextField
                            type="date"
                            defaultValue={moment(this.props.n.session_date).format('YYYY-MM-DD')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={this.props.n.student_name}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={this.props.n.school_name}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={this.props.n.grade_level}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={this.props.n.subjects}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={this.props.n.topics}
                        />
                    </TableCell>
                    <TableCell>{moment(this.props.n.time).format('h:mm:ss')}</TableCell>
                    <TableCell>
                        <Button onClick={this.toggleEdit}>Cancel</Button>
                    </TableCell>
                </div>
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
                        <Button onClick={this.toggleEdit}>Edit</Button>
                    </TableCell>
                </TableRow>
            )
        }

        return (
            <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={this.props.n.id}
            >
                {content}
            </TableRow>
        )
    }
}

export default CompletedSessionsTableRow;
import React, { Component } from 'react';
import moment from 'moment';
// Material UI imports
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button, TextField, Tab } from '@material-ui/core';
// component imports
import EditSessionDialog from './EditSessionDialog';

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

    // componentDidMount = () => {
    //     this.getSchools();
    //     this.getGrades();
    //     this.getSubject();
    // }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing,
        })
    }

    confirmEdit = () => {
        console.log(this.state.session);
    }

    changeSession = (event) => {
        this.setState({
            session: {
                ...this.state.session,
                [event.target.name]: event.target.value,
            }
        })
    }

    render() {
        let content = null;
        let time = null;
        if (this.props.n.time.hours > 0) {
            time = (this.props.n.time.hours * 60) + this.props.n.time.minutes
        } else {
            time = this.props.n.time.minutes
        }
        

        if (this.state.editing) {
            content = (
                <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                >
                    <TableCell padding="checkbox">
                        <TextField
                            type="date"
                            name="session_date"
                            onChange={this.changeSession}
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
                        {/* <SelectSubject default={this.props.n.subjects} /> */}
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={this.props.n.topics}
                        />
                    </TableCell>
                    <TableCell>{time}</TableCell>
                    <TableCell>
                        <Button onClick={this.toggleEdit}>Cancel</Button>
                        <Button onClick={this.confirmEdit}>Confirm Changes</Button>
                    </TableCell>
                </TableRow>
            )
        } else {
            content = (
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
                        {/* <Button onClick={this.toggleEdit}>Edit</Button> */}
                        <EditSessionDialog 
                        session={this.props.n} 
                        />
                    </TableCell>
                    {/* <TableCell>{JSON.stringify(this.props.n)}</TableCell> */}
                </TableRow>
            )
        }

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }
}

export default CompletedSessionsTableRow;
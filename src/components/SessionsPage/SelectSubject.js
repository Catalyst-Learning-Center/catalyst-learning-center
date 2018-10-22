import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    subjects: state.subjects,
    selectedSubject: state.sessions.subject
});

class SelectSubject extends Component {
    componentDidMount = () => {
        this.getSubjects();
    }

    getSubjects = () => {
        this.props.dispatch({ type: 'GET_SUBJECTS' })
    }

    handleChange = (event) => {
        console.log(event.target.value);
        let action = {
            type: 'SET_SESSION_SUBJECT',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        let content = null;
        // overtime is brought in via EndSessionDialog.js
        if (this.props.overtime) {
            content = (
                // if the session runs overtime, highlight the subject dropdown
                <mark><Select
                    defaultValue="3"
                    value={this.props.selectedSubject}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'subject',
                        id: 'subject',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.props.subjects.map((subject) => {
                        return (
                            <MenuItem key={subject.id} value={subject.id}>{subject.subjects}</MenuItem>
                        )
                    })}
                </Select></mark>
            )
        } else {
            content = (
                // if the session ends within the allowed timegframe, don't highlight the subject dropdown
                // also removes the highlighted subject dropdown from edit field
                <Select
                    defaultValue="3"
                    value={this.props.selectedSubject}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'subject',
                        id: 'subject',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.props.subjects.map((subject) => {
                        return (
                            <MenuItem key={subject.id} value={subject.id}>{subject.subjects}</MenuItem>
                        )
                    })}
                </Select>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelectSubject);
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const mapStateToProps = state => ({
    subjects: state.subjects,
    selectedSubject: state.sessions.subject
});//end mapStateToProps

class SelectSubject extends Component {
    componentDidMount = () => {
        this.getSubjects();
    };//end componentDidMount

    getSubjects = () => {
        this.props.dispatch({ type: 'GET_SUBJECTS' })
    };//end getSubjects

    handleChange = (event) => {
        let action = {
            type: 'SET_SESSION_SUBJECT',
            payload: event.target.value
        }//end action
        this.props.dispatch(action);
    };//end handleChange

    render() {
        let content = null;
        // overtime is brought in via EndSessionDialog.js
        if (this.props.overtime) {
            content = (
                // if the session runs overtime, highlight the subject dropdown
                <div>
                <InputLabel htmlFor="subject">Subject: </InputLabel>
                <mark>
                    <Select
                    style={{minWidth: '200px'}}
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
                </Select></mark></div>
            )
        } else {
            content = (
                // if the session ends within the allowed timegframe, don't highlight the subject dropdown
                // also removes the highlighted subject dropdown from edit field
                <div>
                <InputLabel htmlFor="subject">Subject: </InputLabel>
                <Select
                    style={{minWidth: '200px'}}
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
                </div>
            )
        }//end if else
        return (
            <div>
                {content}
            </div>
        )
    };//end render
};//end SelectSubjects Component

export default connect(mapStateToProps)(SelectSubject);
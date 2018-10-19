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
        this.props.dispatch({type: 'GET_SUBJECTS'})
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
        return (
            <div>
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
                        return(
                            <MenuItem key={subject.id} value={subject.id}>{subject.subjects}</MenuItem>
                        )
                    })}
                </Select>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelectSubject);
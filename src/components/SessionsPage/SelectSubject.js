import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
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
        // Axios({
        //     method: 'GET',
        //     url: '/subjects'
        // }).then((response) => {
        //     console.log('back from /subjects GET with: ', response.data);
        //     this.setState({
        //         subjects: response.data,
        //     });
        // }).catch((error) => {
        //     console.log('/subjects GET error: ', error);
        //     alert('there was a problem getting the subjects');
        // })
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
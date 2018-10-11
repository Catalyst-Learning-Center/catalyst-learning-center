import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
// Material UI imports
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    subject: state.sessions.subject
});

class SelectSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            selectedSubject: 0,
        };
    }

    componentDidMount = () => {
        this.getSubjects();
    }

    getSubjects = () => {
        Axios({
            method: 'GET',
            url: '/subjects'
        }).then((response) => {
            console.log('back from /subjects GET with: ', response.data);
            this.setState({
                subjects: response.data,
            });
        }).catch((error) => {
            console.log('/subjects GET error: ', error);
            alert('there was a problem getting the subjects');
        })
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
                    value={this.props.subject}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'subject',
                        id: 'subject',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.state.subjects.map((subject) => {
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
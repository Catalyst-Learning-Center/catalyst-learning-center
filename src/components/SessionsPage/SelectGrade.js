import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    selectedGrade: state.sessions.grade,
    grades: state.grades
});

class SelectGrade extends Component {
    componentDidMount = () => {
        this.getGrades();
    }

    getGrades = () => {
        this.props.dispatch({type: 'GET_GRADES'});
    }

    handleChange = (event) => {
        console.log(event.target.value);
        let action = {
            type: 'SET_SESSION_GRADE',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <div class="new-session-inputs">
                <InputLabel htmlFor="grade">Grade</InputLabel>
                <Select
                    value={this.props.selectedGrade}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'grade',
                        id: 'grade',
                    }}
                >
                    <MenuItem value="0">
                        <em>None</em>
                    </MenuItem>
                    {this.props.grades.map((grade) => {
                        return(
                            <MenuItem key={grade.id} value={grade.id}>{grade.grade_level}</MenuItem>
                        )
                    })}
                </Select>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelectGrade);
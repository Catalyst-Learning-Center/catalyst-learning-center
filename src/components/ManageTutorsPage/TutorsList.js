import React, { Component } from 'react';
import { connect } from 'react-redux';
// component imports
import TutorListItem from './TutorListItem';

const mapStateToProps = state => ({
    tutors: state.tutors,
});//end mapStateToProps

class TutorsList extends Component {
    componentDidMount = () => {
        this.getTutors();
    };//end componentDidMount

    getTutors = () => {
        this.props.dispatch({type: 'GET_TUTORS'});
    };//end getTutors

    render() {
        return (
            <div>
                {this.props.tutors.map((tutor) => {
                    return(
                        <TutorListItem key={tutor.id} tutor={tutor} />
                    )
                })}
            </div>
        )
    };//end render
};//end TutorList Component

export default connect(mapStateToProps)(TutorsList);
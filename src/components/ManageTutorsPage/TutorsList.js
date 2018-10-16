import React, { Component } from 'react';
import { connect } from 'react-redux';

// component imports
import TutorListItem from './TutorListItem';

const mapStateToProps = state => ({
    tutors: state.tutors,
});

class TutorsList extends Component {
    componentDidMount = () => {
        this.getTutors();
    }

    getTutors = () => {
        this.props.dispatch({type: 'GET_TUTORS'});
    }

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
    }
}

export default connect(mapStateToProps)(TutorsList);
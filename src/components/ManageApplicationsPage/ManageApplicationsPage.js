import React, { Component } from 'react'

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class ManageApplicationsPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        }
    }

    render() {
        if (this.props.user.userName) {
            content = (
                <div>

                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ManageApplicationsPage);
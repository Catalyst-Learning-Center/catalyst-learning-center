import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => ({
    alert: state.alert
});

class AlertDialog extends Component {

    handleClose = () => {
        //this handles closing of the edit alert
        this.props.dispatch({
            type: 'CLOSE_ALERT'
        })
        this.props.dispatch({type: this.props.alert.dispatch});
    }//end handleClose

    render() {
        return (
            <Dialog
                open={this.props.alert.open}
            >
                <DialogTitle id="alert-dialog-title">{this.props.alert.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.alert.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }//end render
}//end EditLocationsAlert Component

export default connect(mapStateToProps)(AlertDialog);
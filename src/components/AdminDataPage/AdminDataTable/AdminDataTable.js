import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const MapStateToProps = state => ({
    state,
});



class AdminDataTable extends Component {
componentDidMount() {

}

render () {
    let content = null;


    // if (this.props.user.userName) {
        content = (
            <div>
            
            </div>
        );
    // }

return (
    <div>
        {content}
    </div>
)

}

}

export default connect(MapStateToProps)(AdminDataTable);
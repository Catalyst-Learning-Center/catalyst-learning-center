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
import moment from 'moment';


//filter imports
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';

const MapStateToProps = state => ({
    state,
    grades: state.grades
});

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'session_date', numeric: false, disablePadding: true, label: 'Date' },
    { id: 'location_name', numeric: false, disablePadding: true, label: 'Location' },
    { id: 'student_name', numeric: false, disablePadding: true, label: 'Student Name' },
    { id: 'school_name', numeric: false, disablePadding: true, label: 'School' },
    { id: 'grade_level', numeric: true, disablePadding: false, label: 'Grade Level' },
    { id: 'subjects', numeric: false, disablePadding: true, label: 'Subject' },
    { id: 'start_time', numeric: true, disablePadding: false, label: 'Time Spent' },
];

class AdminDataHeader extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

AdminDataHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
        flex: ' 1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let AdminTableToolbar = props => {
    const { numSelected, classes } = props;



    return (
        <div>
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {numSelected} Selected
            </Typography>
                    ) : (
                            <Typography variant="h6" id="tableTitle">
                                Tutoring Data
            </Typography>
                        )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions} >
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Filter List">
                                <IconButton aria-label="Filter List">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                </div>
            </Toolbar>
        </div>
    );
};

AdminTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

AdminTableToolbar = withStyles(toolbarStyles)(AdminTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class AdminDataTable extends Component {

    componentDidMount() {
        this.getSessionData();
        this.props.dispatch({type: 'GET_GRADES'});
    }

    

    state = {
        order: 'asc',
        orderBy: 'date',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
        locationFilter: '',
        subjectFilter: '',
        schoolFilter: '',
        gradeFilter: ''
    }

    getSessionData = () => {
        console.log('in getSessionData');
        axios({
            method: 'GET',
            url: '/sessions'
        }).then((response) => {
            this.setState({
                data: response.data
            });
            console.log('back from server with: ', response.data);
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        })

    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(session => session.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => {
        return this.state.selected.indexOf(id) !== -1;
    }

    handleFilterChange = (e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    filterLocation = (data) => {
        let filteredData = data;
        if (this.state.locationFilter.length) {
            filteredData = filteredData.filter(session => {
                if (session.location_name.toLowerCase().includes(this.state.locationFilter.toLowerCase())) {
                    return session;
                }
            });
        }
        if (this.state.subjectFilter.length) {
            filteredData = filteredData.filter(session => {
                if (session.subjects.toLowerCase().includes(this.state.subjectFilter.toLowerCase())) {
                    return session;
                }
            });
        }
         if (this.state.schoolFilter.length) {
            filteredData = filteredData.filter(session => {
                if (session.school_name.toLowerCase().includes(this.state.schoolFilter.toLowerCase())) {
                    return session;
                }
            });
        }
        if (this.state.gradeFilter.length) {
            filteredData = filteredData.filter(session => {
                if (session.grade_level.toLowerCase() === this.state.gradeFilter.toLowerCase()) {
                    return session;
                }
            });
        }

        return filteredData;
    }

    render() {
        let content = null;

        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        let filteredData = this.filterLocation(data);


        content = (
            <div>
                <div style={{ backgroundColor: '#f4f4f4', width: '500px', height: '200px' }}>
                    <TextField
                        name="locationFilter"
                        label="location"
                        margin="normal"
                        value={this.state.locationFilter}
                        onChange={this.handleFilterChange}
                    />
                    <TextField
                        name="subjectFilter"
                        label="subject"
                        margin="normal"
                        value={this.state.subjectFilter}
                        onChange={this.handleFilterChange}
                    />
                    <TextField
                        name="schoolFilter"
                        label="school"
                        margin="normal"
                        value={this.state.schoolFilter}
                        onChange={this.handleFilterChange}
                    />
                    <FormControl >
                    <InputLabel htmlFor="gradegradeFilter">Grade:</InputLabel>
                    <Select
                        value={this.state.gradeFilter}
                        onChange={this.handleFilterChange}
                        inputProps={{
                            name: 'gradeFilter',
                            id: 'gradeFilter',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                         {this.props.grades.map(grade => {
                            return (
                                <MenuItem value={grade.grade_level}>{grade.grade_level}</MenuItem>
                            )
                        })}
                        
                    </Select>
                    </FormControl>
                </div>


                <Paper className={classes.root}>
                    <AdminTableToolbar numSelected={selected.length} />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <AdminDataHeader
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={filteredData.length}
                            />
                            <TableBody>
                                {stableSort(filteredData, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((session, i) => {
                                        const isSelected = this.isSelected(session.id);
                                        let time = null;
                                        if (session.time.hours > 0 && session.time.minutes == null) {
                                            time = (session.time.hours * 60);
                                        } else if (session.time.hours > 0) {
                                            time = (session.time.hours * 60) + session.time.minutes;
                                        } else {
                                            time = session.time.minutes;
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, session.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={i}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {moment(session.session_date.toString()).format('MM/DD/YY')}
                                                </TableCell>
                                                <TableCell>{session.location_name}</TableCell>
                                                <TableCell>{session.student_name}</TableCell>
                                                <TableCell>{session.school_name}</TableCell>
                                                <TableCell numeric>{session.grade_level}</TableCell>
                                                <TableCell>{session.subjects}</TableCell>
                                                <TableCell numeric>{time}</TableCell>
                                                {/* {moment(session.time).format('h:mm')} */}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backiconbuttonprop={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );

        return (
            <div>
                {content}
            </div>
        )
    }
}

AdminDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

let AdminExport = withStyles(styles)(AdminDataTable)

export default connect(MapStateToProps)(AdminExport);


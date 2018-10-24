import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// moment.js
import moment from 'moment';
// CSV export
import { CSVLink } from "react-csv";
//Material UI 
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DownloadCsv from '@material-ui/icons/GetApp';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const MapStateToProps = state => ({
    state,
    grades: state.grades,
    subjects: state.subjects,
    locations: state.locations.locations
});//end MapStateToProps
//function to that creates a sort by descending order
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};//end desc

//function to preserve intitial order of items
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
};//end stableSort

//function that sorts data
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};//end getSorting

const rows = [
    { id: 'session_date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'location_name', numeric: false, disablePadding: true, label: 'Location' },
    { id: 'student_name', numeric: false, disablePadding: true, label: 'Student Name' },
    { id: 'school_name', numeric: false, disablePadding: true, label: 'School' },
    { id: 'grade_level', numeric: true, disablePadding: false, label: 'Grade Level' },
    { id: 'subjects', numeric: false, disablePadding: true, label: 'Subject' },
    { id: 'start_time', numeric: true, disablePadding: false, label: 'Time Spent' },
];//end rows array

class AdminDataHeader extends Component {

//function for click event that causes the sort to happen
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };//end createSortHandler

    render() {
        const { order, orderBy, } = this.props;
        return (
            <TableHead>
                <TableRow>
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
    };//end render
};//end AdminDataHeader Component

AdminDataHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

//create toolbar styles
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
        display: 'flex'
    },
    title: {
        flex: '0 0 auto',
    },
});//end toolbarStyles

let AdminTableToolbar = props => {
    const { numSelected, classes, filteredData } = props;
    
    // set table headers for the CSV export
    const headers = [
        { label: "Location", key: "location_name" },
        { label: "Session Date", key: "session_date" },
        { label: "Student Name", key: "student_name" },
        { label: "School Name", key: "school_name" },
        { label: "Grade Level", key: "grade_level" },
        { label: "Subject", key: "subjects" },
        { label: "Time (Minutes)", key: "time" }
    ];//end headers array
    return (
        <div>
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    <Typography variant="h6" id="tableTitle">
                        Tutoring Data
                    </Typography>
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions} >
                    <Typography variant="caption" align="nowrap" style={{width: '85px', marginTop: '16px', color: 'rgb(117,117,117)'}}>Export as CSV</Typography>
                    <Tooltip title="Export CSV" >
                        <CSVLink
                            data={filteredData}
                            headers={headers}
                        >
                            <IconButton aria-label="Export CSV">
                                <DownloadCsv />
                            </IconButton>
                        </CSVLink>
                    </Tooltip>
                </div>
            </Toolbar>
        </div>
    );
};//end AdminTableToolBar

AdminTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

AdminTableToolbar = withStyles(toolbarStyles)(AdminTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});//end styles

class AdminDataTable extends Component {

    componentDidMount() {
        this.getSessionData(); // get sessions
        this.getYearData(); // get school year
        this.props.dispatch({ type: 'GET_GRADES' });
        this.props.dispatch({ type:'GET_SUBJECTS' });
        this.props.dispatch({ type: 'GET_LOCATIONS' });
    };//end componentDidMount

    state = {
        order: 'asc',
        orderBy: 'date',
        selected: [],
        data: [],
        datasets: [],
        years: [],
        page: 0,
        rowsPerPage: 5,
        locationFilter: '',
        subjectFilter: '',
        schoolFilter: '',
        gradeFilter: '',
        yearFilter: ''
    };//end state

//function to get data by school year in data table
    getYearData = () => {
        axios({
            method: 'GET',
            url: '/sessions/library-summary/0'
        }).then((response) => {
            this.setState({
                datasets: response.data,
            });
            this.setData();
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        });//end error handling
    };//end getYearData

//set data arrays for school year data
    setData = () => {
        let dataLabels = [];
        let sortedData = this.state.datasets.sort(function(a, b) {
            return moment(a.date).format('YYYY') - moment(b.date).format('YYYY');
        })
        sortedData = sortedData.filter(session => {
            if (session.location_name === 'Hosmer Library') {
                return session;
            }
        })
        for (let location of sortedData) {
            let currentYear = moment(location.date).format('YYYY');
            let lastYear = moment(location.date).subtract(1, 'years').format('YYYY');
            let schoolYear = lastYear +'-'+ currentYear;
            let year = {
                year: currentYear,
                schoolYear: schoolYear
            }
            dataLabels.push(year);
        }
        this.setState({
            years: dataLabels
        });//end setState
    };//end setData

//get session data to populate data table
    getSessionData = () => {
        axios({
            method: 'GET',
            url: '/sessions'
        }).then((response) => {
            for (let session of response.data) {
                let time = null;
                if (session.time.hours > 0 && session.time.minutes == null) {
                    time = (session.time.hours * 60);
                } else if (session.time.hours > 0) {
                    time = (session.time.hours * 60) + session.time.minutes;
                } else {
                    time = session.time.minutes;
                };//end if else
                session.time = time;
                session.session_date = moment(session.session_date.toString()).format('MM/DD/YY');
            };
            this.setState({
                data: response.data
            });//end setState
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        });//end error handling
    };//end getSessionsData

//function to handle the request to sort
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };//end handleRequestSort

//function for changing pages of data table
    handleChangePage = (event, page) => {
        this.setState({ page });
    };//end handleChangePage

//function to change row view for showing 5, 10, 25 rows
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };//end handleChangeRowsPerPage

    isSelected = id => {
        return this.state.selected.indexOf(id) !== -1;
    };//end isSelected

//function to handle filter
    handleFilterChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });//end setState
    };//end handleFilterChange

    // function for the table filtering
    filterData = (data) => {
        let filteredData = data;
        if (this.state.locationFilter.length) { //filter by location
            filteredData = filteredData.filter(session => {
                if (session.location_name.toLowerCase().includes(this.state.locationFilter.toLowerCase())) {
                    return session;
                }
            });
        }
        if (this.state.subjectFilter.length) { // filter by subject
            filteredData = filteredData.filter(session => {
                if (session.subjects.toLowerCase().includes(this.state.subjectFilter.toLowerCase())) {
                    return session;
                }
            });
        }
        if (this.state.schoolFilter.length) { // filter by school
            filteredData = filteredData.filter(session => {
                if (session.school_name.toLowerCase().includes(this.state.schoolFilter.toLowerCase())) {
                    return session;
                }
            });
        }
        if (this.state.gradeFilter.length) { // filter by grade
            filteredData = filteredData.filter(session => {
                if (session.grade_level.toLowerCase() === this.state.gradeFilter.toLowerCase()) {
                    return session;
                }
            });
        }
        if (this.state.yearFilter.length) { // filter by year
            filteredData = filteredData.filter(session => {
                let date = moment(session.session_date).format('MM/DD');
                let year = moment(session.session_date).format('YYYY');
                if (date < '08/01' && year == this.state.yearFilter) {
                    return session;
                } else if (date > '07/31' && year == (this.state.yearFilter - 1)) {
                    return session;
                }//end if else
            });//end filteredData
        }
        return filteredData;
    }//end filterData

    render() {
        let content = null;

        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        // pass all session data through the filters
        let filteredData = this.filterData(data);

        content = (
            <div>
                <Paper className={classes.root}>
                <AdminTableToolbar numSelected={selected.length} filteredData={filteredData} />
                <div className="filter-container">
                <FormControl style={{ minWidth: '15%' }}>
                            <InputLabel htmlFor="yearFilter" shrink>Filter by School Year:</InputLabel>
                        <Select
                            value={this.state.yearFilter}
                            onChange={this.handleFilterChange}
                            inputProps={{
                                name: 'yearFilter',
                                id: 'yearFilter',
                            }}
                        >
                            <MenuItem value="">
                                <p>Any</p>
                            </MenuItem>
                            {this.state.years.map(year => {
                                return (
                                    <MenuItem value={year.year}>{year.schoolYear}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                        <FormControl style={{ minWidth: '15%' }}>
                            <InputLabel htmlFor="locationFilter" shrink>Filter by Location:</InputLabel>
                        <Select
                            value={this.state.locationFilter}
                            onChange={this.handleFilterChange}
                            inputProps={{
                                name: 'locationFilter',
                                id: 'locationFilter',
                            }}
                        >
                            <MenuItem value="">
                                <p>Any</p>
                            </MenuItem>
                            {this.props.locations.map(location => {
                                return (
                                    <MenuItem value={location.location_name}>{location.location_name}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                        <FormControl style={{ minWidth: '15%' }}>
                            <InputLabel htmlFor="schoolFilter" shrink>Filter by School:</InputLabel>
                    <TextField
                        name="schoolFilter"
                        id="schoolFilter"
                        margin="normal"
                        value={this.state.schoolFilter}
                        onChange={this.handleFilterChange}
                    />
                    </FormControl>
                        <FormControl style={{ minWidth: '15%'}}>
                            <InputLabel htmlFor="gradeFilter" shrink>Filter by Grade Level:</InputLabel>
                        <Select
                            value={this.state.gradeFilter}
                            onChange={this.handleFilterChange}
                            inputProps={{
                                name: 'gradeFilter',
                                id: 'gradeFilter',
                            }}
                        >
                            <MenuItem value="">
                                <p>Any</p>
                            </MenuItem>
                            {this.props.grades.map(grade => {
                                return (
                                    <MenuItem value={grade.grade_level}>{grade.grade_level}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                        <FormControl style={{ minWidth: '15%' }}>
                        <InputLabel htmlFor="subjectFilter" shrink>Filter by Subject:</InputLabel>
                        <Select
                            value={this.state.subjectFilter}
                            onChange={this.handleFilterChange}
                            inputProps={{
                                name: 'subjectFilter',
                                id: 'subjectFilter',
                            }}
                        >
                            <MenuItem value="">
                                <p>Any</p>
                            </MenuItem>
                            {this.props.subjects.map(subject => {
                                return (
                                    <MenuItem value={subject.subjects}>{subject.subjects}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <AdminDataHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={filteredData.length}
                        />
                        <TableBody>
                            {stableSort(filteredData, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((session, i) => {
                                    const isSelected = this.isSelected(session.id);
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={i}
                                        >
                                            <TableCell component="th" scope="row" >
                                                {session.session_date}
                                            </TableCell>
                                            <TableCell padding="none">{session.location_name}</TableCell>
                                            <TableCell padding="none">{session.student_name}</TableCell>
                                            <TableCell padding="none">{session.school_name}</TableCell>
                                            <TableCell numeric>{session.grade_level}</TableCell>
                                            <TableCell padding="none">{session.subjects}</TableCell>
                                            <TableCell numeric>{session.time} minutes</TableCell>
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
    };//end render
};//end AdminDataTable Component

AdminDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

let AdminExport = withStyles(styles)(AdminDataTable)

export default connect(MapStateToProps)(AdminExport);
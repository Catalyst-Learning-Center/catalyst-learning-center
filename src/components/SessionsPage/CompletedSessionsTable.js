import React from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// component imports
import CompletedSessionsTableRow from './CompletedSessionsTableRow';

const mapStateToProps = state => ({
    completedSessions: state.sessions.completedSessions
});

// let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//     counter += 1;
//     return { id: counter, name, calories, fat, carbs, protein };
// }

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

// const rows = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

// class EnhancedTableHead extends React.Component {
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };

//   render() {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell padding="checkbox">
//             <Checkbox
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={numSelected === rowCount}
//               onChange={onSelectAllClick}
//             />
//           </TableCell>
//           {rows.map(row => {
//             return (
//               <TableCell
//                 key={row.id}
//                 numeric={row.numeric}
//                 padding={row.disablePadding ? 'none' : 'default'}
//                 sortDirection={orderBy === row.id ? order : false}
//               >
//                 <Tooltip
//                   title="Sort"
//                   placement={row.numeric ? 'bottom-end' : 'bottom-start'}
//                   enterDelay={300}
//                 >
//                   <TableSortLabel
//                     active={orderBy === row.id}
//                     direction={order}
//                     onClick={this.createSortHandler(row.id)}
//                   >
//                     {row.label}
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//             );
//           }, this)}
//         </TableRow>
//       </TableHead>
//     );
//   }
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: theme.spacing.unit,
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes } = props;

//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography color="inherit" variant="subtitle1">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography variant="h6" id="tableTitle">
//             Nutrition
//           </Typography>
//         )}
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton aria-label="Filter list">
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </div>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//   },
//   table: {
//     minWidth: 1020,
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//   },
// });

class CompletedSessionsTable extends React.Component {
    state = {
        // order: 'asc',
        // orderBy: 'calories',
        // data: [],
        page: 0,
        rowsPerPage: 5,
    };

    componentDidMount = () => {
        this.getCompletedSessions();
    }

    getCompletedSessions = () => {
        // Axios({
        //     method: 'GET',
        //     url: '/sessions/completed'
        // }).then((response) => {
        //     console.log('back from /sessions/completed get with: ', response.data);
        //     this.setState({
        //         data: response.data
        //     });
        // }).catch((error) => {
        //     console.log('/sessions/completed get error: ', error);
        //     alert('there was an error getting the completed sessions');
        // })
        this.props.dispatch({type: 'GET_COMPLETED_SESSIONS'});
    }

    // handleRequestSort = (event, property) => {
    //     const orderBy = property;
    //     let order = 'desc';

    //     if (this.state.orderBy === property && this.state.order === 'desc') {
    //         order = 'asc';
    //     }

    //     this.setState({ order, orderBy });
    // };

    // handleSelectAllClick = event => {
    //     if (event.target.checked) {
    //         this.setState(state => ({ selected: state.data.map(n => n.id) }));
    //         return;
    //     }
    //     this.setState({ selected: [] });
    // };

    // handleClick = (event, id) => {
    //     const { selected } = this.state;
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }

    //     this.setState({ selected: newSelected });
    // };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        // const { classes } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.completedSessions.length - page * rowsPerPage);

        return (
            <Paper>
                <div>
                    <Table aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>School</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Subtopic</TableCell>
                                <TableCell>Total Time</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(this.props.completedSessions, getSorting())
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    // const isSelected = this.isSelected(n.id);
                                    return (
                                        <CompletedSessionsTableRow key={n.id} n={n} />
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
                    count={this.props.completedSessions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

// EnhancedTable.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps)(CompletedSessionsTable);
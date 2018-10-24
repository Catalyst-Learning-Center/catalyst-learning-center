const defaultState = {
    open: false,
    dispatch: '',
    title: '',
    content: '',
}//end defaultState

// opens and closes an alert with the recieved data
const alert = (state = defaultState, action) => {
    if (action.type === 'OPEN_ALERT') {
        return action.payload;
    } else if (action.type === 'CLOSE_ALERT') {
        return defaultState;
    };//else if
    return state
}//end alert

export default alert;
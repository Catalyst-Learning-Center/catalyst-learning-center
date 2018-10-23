const defaultState = {
    open: false,
    dispatch: '',
    title: '',
    content: '',
}

const alert = (state = defaultState, action) => {
    if (action.type === 'OPEN_ALERT') {
        return action.payload;
    } else if (action.type === 'CLOSE_ALERT') {
        return defaultState;
    }
    return state
}

export default alert;
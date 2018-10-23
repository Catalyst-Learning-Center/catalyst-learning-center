const applicationToDisplay = (state=[], action) => {
    if (action.type === 'DISPLAY_APPLICATIONS') {
        return action.payload;
    }
    return state
}
export default applicationToDisplay;
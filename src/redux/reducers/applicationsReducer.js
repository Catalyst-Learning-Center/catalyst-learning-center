// stores all the active applications
const applicationToDisplay = (state=[], action) => {
    if (action.type === 'DISPLAY_APPLICATIONS') {
        return action.payload;
    }
    return state
}//end applicationToDisplay

export default applicationToDisplay;
const locations = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOCATIONS':
            return action.payload || state;
        default:
            return state;
    }
};

export default locations;
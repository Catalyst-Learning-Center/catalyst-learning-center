const locations = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOCATIONS':
            return action.payload || state;
        case 'ADD_LOCATIONS':
            return [...state, action.payload];
        case 'REMOVE_LOCATIONS':
            return state.filter((id) => id !== action.payload);
        default:
            return state;
    }
};

export default locations;
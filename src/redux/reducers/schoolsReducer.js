const schools = (state = [], action) => {
    switch (action.type) {
        case 'SET_SCHOOLS':
            return action.payload || state;
        default:
            return state;
    }
};

export default schools;
const grades = (state = [], action) => {
    switch (action.type) {
        case 'SET_GRADES':
            return action.payload || state;
        default:
            return state;
    }
};

export default grades;
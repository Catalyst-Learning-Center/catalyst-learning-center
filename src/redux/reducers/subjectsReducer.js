const subjects = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUBJECTS':
            return action.payload || state;
        default:
            return state;
    }
};

export default subjects;
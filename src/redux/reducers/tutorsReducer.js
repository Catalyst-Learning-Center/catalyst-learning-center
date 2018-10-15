const tutors = (state = [], action) => {
    switch (action.type) {
        case 'SET_TUTORS':
            return action.payload || state;
        default:
            return state;
    }
};

export default tutors;
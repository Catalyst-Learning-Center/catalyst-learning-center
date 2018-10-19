const subjects = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUBJECTS':
            return action.payload || state;
        case 'ADD_SUBJECT':
            return [...state, action.payload];
        case 'REMOVE_SUBJECT':
            return state.filter((id) => id !== action.payload);
        default:
            return state;
    }
};

export default subjects;
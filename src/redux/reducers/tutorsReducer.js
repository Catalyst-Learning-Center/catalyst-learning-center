// stores the list of tutors
const tutors = (state = [], action) => {
    switch (action.type) {
        case 'SET_TUTORS':
            return action.payload || state;
        default:
            return state;
    };//end switch
};//end tutors

export default tutors;
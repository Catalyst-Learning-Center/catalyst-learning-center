// stores a list of schools
const schools = (state = [], action) => {
    switch (action.type) {
        case 'SET_SCHOOLS':
            return action.payload || state;
        default:
            return state;
    };//end switch
};//end schools

export default schools;
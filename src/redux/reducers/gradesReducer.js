// stores the list of grades
const grades = (state = [], action) => {
    switch (action.type) {
        case 'SET_GRADES':
            return action.payload || state;
        default:
            return state;
    }//end switch
};//end grades

export default grades;
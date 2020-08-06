//Used to store the details of the students
const viewStudentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            return action.payload;
        default:
            return state;
    }
}

export default viewStudentReducer;
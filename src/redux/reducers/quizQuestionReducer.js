//Used to store the details of the book that was clicked
const questions = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            return action.payload;
        default:
            return state;
    }
}

export default questions;
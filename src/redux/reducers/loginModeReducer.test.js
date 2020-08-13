import loginModeReducer from './loginModeReducer';
import userReducer from './userReducer';


describe('Testing the loginModeReducer...', () => {

test('test initial state is login', () => {
    //testing initialization, don't really care about the action
    const action = {type: 'test'};
    const previousState = undefined;
//    state should be undefined
    let newState = loginModeReducer(previousState, action);
    expect( newState).toEqual('login');
})

test('test switching to register mode', () => {
    //testing initialization, don't really care about the action
    const action = {type: 'SET_TO_REGISTER_MODE'};
    const previousState = 'login';
//    state should be undefined
    let newState = loginModeReducer(previousState, action);
    expect( newState).toEqual('register');
})

})
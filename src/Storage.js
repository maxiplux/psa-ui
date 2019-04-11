import {createStore} from 'redux';

const initialState = {
    user: {}
};

const reducer = (state = initialState, action) => {
    if (action.type === "SET_USER") {
        return {
            ...state,
            user: action.user
        };
    }
    return state;
};

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store=createStore(reducer,persistedState);
export default  store;
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
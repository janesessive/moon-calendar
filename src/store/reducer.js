import { SET_BIRTH_DATA } from './actions';


const initialState = {
    birthData: {}
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_BIRTH_DATA:
            return {...state,
                birthData: action.birthData
            }
            default:
                return state;
    }
    
};

export default reducer;
import { errorMessage, successMessage } from './notificationReducer';
import boxService from '../services/boxService';

export const boxActions = {
    SET_BOXES: 'SET_BOXES'
};

export const initialState = {
    boxes: []   
};

export const getBoxes = token => {
    return async dispatch => {
        const boxes = await boxService.getAll(token);
        console.log(boxes);
        dispatch({
            type: boxActions.SET_BOXES,
            boxes: boxes
        });
    };
};

const boxReducer = (state = initialState, action) => {
    switch (action.type) {
    case boxActions.SET_BOXES:
        return Object.assign({}, state, { boxes: action.boxes });
    default:
        return state;
    }
};

export default boxReducer;
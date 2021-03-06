import { handleActions, createAction } from 'redux-actions';
import {pending} from 'redux/helper/pending'
import {Map} from 'immutable';
//액션
const MOTION= 'MAIN/MOTION';

//액션생성자
export const motionActions = createAction(MOTION);

//초기화
const initialState=Map({
    motions:Map({
        isPressed:false,
        detailView:false,
        min:0,
        offsetX:0,
        active:0,
        locationState:false,
        scale:false
    })
})

//리듀서
export default handleActions({
    [MOTION]:(state,action)=>{
        const {motions}=action.payload;
        return state.mergeIn(['motions'],motions)
    },
 
}, initialState);
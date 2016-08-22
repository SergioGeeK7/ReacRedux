import * as types from '../actions/actionTypes'
import initialState from './initialState'

// this reducer hold the last call state . the first time will be undefined 
// reducer only manages a litle slice of the store
// state here representes a array of courses
export default function courseReducer (state = initialState.courses, action){
    switch(action.type){
        case types.LOAD_COURSES_SUCCESS:
            return action.courses
				break;
			case types.CREATE_COURSE_SUCCESS:
					return [
						...state,
						Object.assign({},action.course)
				]
				break;
				case types.UPDATE_COURSE_SUCCESS:
					return [
						...state.filter(course => course.id !== action.course.id),
						Object.assign({}, action.course)
					]
        default:
            return state;
    }
}
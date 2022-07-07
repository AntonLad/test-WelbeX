/* eslint-disable import/no-anonymous-default-export */
const UPDATE_COUNT = 'UPDATE_COUNT' 

const initialState = {
  countArr: []
}  
  
export default (state = initialState, action) => {  
  switch (action.type) {  
    case UPDATE_COUNT: {  
      return {  
        ...state,  
        countArr: action.payload  
      }  
    }  
    default:  
      return state  
  }  
} 

export function changeFourCounter(arrayFourCount) {  
  return (dispatch) => {
    dispatch({ type: UPDATE_COUNT, payload: arrayFourCount })
  }
}  
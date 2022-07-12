/* eslint-disable import/no-anonymous-default-export */
const UPDATE_INFO = 'UPDATE_INFO' 

const initialState = {
  arrayOfForms: {}
}  
  
export default (state = initialState, action) => {  
  switch (action.type) {  
    case UPDATE_INFO: {  
      return {  
        ...state,  
        arrayOfForms: action.payload
      }  
    }  
    default:  
      return state  
  }  
} 

export function makeForm(newForm) {  
  return (dispatch) => {
    dispatch({ type: UPDATE_INFO, payload: newForm })
  }
}  
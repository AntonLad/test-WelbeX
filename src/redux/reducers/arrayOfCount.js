/* eslint-disable import/no-anonymous-default-export */
const UPDATE_ARRAY = 'UPDATE_ARRAY' 

const initialState = {
  array: [{ count: 0, id: 0 }]
}  
  
export default (state = initialState, action) => {  
  switch (action.type) {  
    case UPDATE_ARRAY: {  
      return {  
        ...state,  
        array: action.payload  
      }  
    }  
    default:  
      return state  
  }  
} 

export function updateArray(arrayOfCounter) {  
  return { type: UPDATE_ARRAY, payload: arrayOfCounter }  
} 

export function increase(count) {  
  return { type: UPDATE_ARRAY, payload: count }  
} 

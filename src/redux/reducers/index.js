import { combineReducers } from 'redux'  
import forms from './forms.js'

  
const createRootReducer = () => combineReducers({
    forms, 
})  
  
export default createRootReducer
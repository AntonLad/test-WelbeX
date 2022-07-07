import { combineReducers } from 'redux'  
import count from './count'
import array from './arrayOfCount'

  
const createRootReducer = () => combineReducers({
    count,
    array, 
})  
  
export default createRootReducer
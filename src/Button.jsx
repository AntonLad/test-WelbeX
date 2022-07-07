import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'

import { updateArray } from './redux/reducers/arrayOfCount'
import { changeFourCounter } from './redux/reducers/count'


export default function Button() {
  const dispatch = useDispatch()
  const array = useSelector((s) => s.array.array)
  
  const onClick = () => {
    const sum = array.reduce((acc, rec) => {
      return acc + rec.count
    }, 0)
    const newArray = [...array, { count: sum, id: Math.random() }]
    dispatch(updateArray(newArray))
    dispatch(changeFourCounter(newArray))
    return newArray
  }

  const onClickDel = () => {
    const newArray = array.slice(0, -1)
    dispatch(updateArray(newArray))
    dispatch(changeFourCounter(newArray))
    return newArray
  }

  return (
    <div>
      <button
        className="mainButtonAdd" 
        type="button"
        onClick={onClick}
      >
        Add counter
      </button>
      <button
        className="mainButtonDel"
        type="button"
        onClick={onClickDel}
      >
        Delete counter
      </button>
    </div> 
  )
}

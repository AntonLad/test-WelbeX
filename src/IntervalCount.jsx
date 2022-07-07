import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { changeFourCounter } from './redux/reducers/count'

export default function IntervalCount({ id }) {
  const arrayFourCount = useSelector(s => s.count.countArr)
  const array = useSelector(s => s.array.array)
  const dispatch = useDispatch()

  const sum = arrayFourCount.reduce((acc, rec) => {
    return acc + rec.count
  }, 0)
  const [count, setCount] = useState(sum / 2 + 1)

  useEffect(() => {
    setTimeout(function() {
      const newArray = array.map((it) => {
        if (it.id === id) {
          setCount(() => count + 1)
          it.count = count
          return it
        }
        return it    
      })
      dispatch(changeFourCounter(newArray))
      return newArray
    }, 1000);
  }, [array, count])

  return (
    <div className="countInterval">
      {count - 1}
    </div>
  )
}

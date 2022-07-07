import React, { useCallback } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { updateArray } from './redux/reducers/arrayOfCount'
import IntervalCount from './IntervalCount'

export default function Counter() {
  const array = useSelector((s) => s.array.array)
  const dispatch = useDispatch()
  
  const threeCounter = useCallback(it => {
    const increase = id => {
      const newArray = array.map(it => {
        if (it.id === id) {
          it.count += 1
          return it
        }
        return it    
      })
      dispatch(updateArray(newArray))
      return newArray
    }
    
    const decrease = id => {
      const newArray = array.map(it => {
        if (it.id === id) {
          it.count -= 1
          return it
        }
        return it    
      })
      dispatch(updateArray(newArray))
      return newArray
    }

    return (
      <div 
        className="counter"
        key={it.id}>
        <button
          className="button" 
          type="button"
          onClick={() => {decrease(it.id)}}
        >
          -
        </button>
        <div className="count">
          {it.count}
        </div>
        <button
          className="button" 
          type="button"
          onClick={() => {increase(it.id)}}
        >
          +
        </button>
      </div>
    )
  }, [array]) 

  return (
    <div>
      {array.map((it, ind) => {
        if ((ind + 1) % 4 !== 0) {
          return (
            <div key={it.id}>
              {threeCounter(it)}
            </div>
          )
        }
        return (
          <div key={it.id}>
            <IntervalCount id={it.id} />
          </div>
        )
      })}
    </div>
  )
}

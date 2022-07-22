import React, { useState } from 'react'
import axios from 'axios'

export default function Sort({ type, setArray }) {
  const [sort, setSort] = useState(-1)
  
  // отправляем данные для сортировки на серверб получаем отсортированный массив 
  const sortUpDown = async () => {
    const sortDownData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/sort',
      data: { type, sort }
    })
    const result = sortDownData.data
    setArray(result)
    return result
  }

  return (
    <button type="button" 
      onClick={() => {
        sortUpDown()
        setSort(sort === 1 ? -1 : 1)
      }}
      style={{ marginLeft: '5px'}}
    >
      Sort
    </button>
  )
}

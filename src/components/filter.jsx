import React, { useState } from 'react'
import axios from 'axios'

export default function Filter({ setArray }) {
  console.log("TEST")
  const [value, setValue] = useState({})
  
  // контролируемый инпут для фильтрации
  const handleChange = (event) => {
    const { name }  = event.target
    setValue(() => {
      const newValue= {[name]: event.target.value }
      return { ...value,  ...newValue }})
  }


  const changeColumn = (e) => {
    setValue({ ...value, column:  e.target.value })
  }
  
  const changeCondition = (e) => {
    setValue({ ...value, condition:  e.target.value })
  }

  // отправляем данные для фильтрации на сервер, получаем отфильтрованный массив, заносим его через setArray в array
  const sendConditions = async () => {
    const sortDownData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/filter',
      data: value 
    })
    const result = sortDownData.data
    setArray(result)
    return result
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
      <select id="column" name="column" onClick={(e) => changeColumn(e)}>
        <option value="" disabled selected>Выберите колонку</option>
        <option value="date">Дата</option>
        <option value="title">Название</option>
        <option value="amount">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select id="condition" name="condition" onClick={(e) => changeCondition(e)}>
      <option value="" disabled selected>Выберите условие</option>
        <option value="equals">Равно</option>
        <option value="less">Меньше</option>
        <option value="more">Больше</option>
        <option value="contains">Содержит</option>
      </select>
      
      <input
        placeholder="Введите значение для фильтра"
        name="valueFilter" 
        value={value.name}
        onChange={e => {handleChange(e)}}
        style={{ width: '200px'}}
      >
      </input>
      <button type="button" onClick={sendConditions}>Go</button>
    </div>
  )
}

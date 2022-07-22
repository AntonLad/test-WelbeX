import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Sort from './sort'
import Filter from './filter'

export default function Main() {
  const [array, setArray] = useState([])
  const[i, setI] = useState(0)

  // делаем запрос на сервер для получения данных из БД
  const getArrayOfData = async () => {
    const dataFromBd = await axios('http://localhost:8080/api/v1/getData')
    const result = dataFromBd.data
    setArray(result)
    return result
  } 
  useEffect(() => {
    getArrayOfData()
  }, [])
  
  // записываем в переменную amountOfTd количество строк для вывода на одной странице
  // создаем пустой массив для отрисовки кнопок пагинации 
  const amountOfTd = 21
  const countOFPage = Math.ceil(array.length / amountOfTd)
  const arrPage = new Array(countOFPage).fill(0)
  
  // кнопки для пагинации по таблице
  const buttonPagination = () => {
    return (
      <div style={{ width: '700px', display: 'flex', flexWrap: 'wrap', marginTop: '15px' }}>
        {arrPage.map((it, ind) => {
          return (
            <button type="button" key={ind}
              onClick={() => setI(ind)}
            >
              {ind+1}
            </button>
          )
        })}
      </div>
    ) 
    
  }

  // наполнение таблицы
  const td = () => {
    return array.slice(i * amountOfTd,  (i + 1)  * amountOfTd).map((it) => {      
      return (
        <tr key={it._id}>
          <td>{it.date}</td>
          <td>{it.title}</td>
          <td>{it.amount}</td>
          <td>{it.distance}</td>
        </tr>
      )
    })  
  }
  
  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', marginLeft: '55px' }}>
        Страница {i + 1}
      </h1>
      
      <Filter setArray={setArray}/>
      <table style={{ width: '700px'}}>
      <caption></caption>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Название 
              <Sort type={'title'} setArray={setArray}/>
            </th>
            <th>Количество 
              <Sort type={'amount'} setArray={setArray}/>
             </th>
            <th>Расстояние 
              <Sort type={'distance'} setArray={setArray}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {td()}
        </tbody>
      </table>
      {buttonPagination()}
    </div>
    
  )
}

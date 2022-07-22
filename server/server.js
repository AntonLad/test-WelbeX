import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { MongoClient } from 'mongodb'
import { resolve } from 'path'
import { Html } from '../src/html.js'


const server = express()
const PORT = 8080
const __dirname = process.cwd()

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'build'))
]

middleware.forEach((it) => server.use(it))

// подключаем MongoDB
const url = "mongodb://127.0.0.1/";  
const client = new MongoClient(url, { useUnifiedTopology: true })

server.get('/', (req, res) => {
  res.send('EXPESS server')
})

// получаем данные с БД 
server.get('/api/v1/getData', async (req, res) => {
  try {
    await client.connect()
    const db = client.db('testWelbeX')
    const collection = db.collection('data')
    let result = await collection.find({}).toArray()
    res.json(result) 
  }
  catch {
   console.log('Error')
  }
})
// сортируем массив 
server.post('/api/v1/sort', async (req, res) => {
  try {
    await client.connect()
    const db = client.db('testWelbeX')
    const collection = db.collection('data')
    const result = await collection.find({}).toArray()
    // сортируем по Названию
    if (req.body.type === 'title') {
      const newResult = result.sort((a, b) => {
        const nameA = a.title.toLowerCase()
        const nameB = b.title.toLowerCase()
        if (nameA < nameB) {return req.body.sort} 
        if (nameA > nameB) {return -req.body.sort} 
        return 0 
      })
      res.json(newResult)
    }
    // сортируем по Количеству и Растоянию
    const newResult = result.sort((a, b) => {
      return req.body.sort === 1 ? a[req.body.type] - b[req.body.type] : b[req.body.type] - a[req.body.type]
    })
    res.json(newResult) 
  }
  catch {
   console.log('Error')
  }
})
// фильтруем массив по полученным данным для фильтрации 
server.post('/api/v1/filter', async (req, res) => {
  try {
    await client.connect()
    const db = client.db('testWelbeX')
    const collection = db.collection('data')
    if (req.body.condition === 'more') {
      // фильтруем массив если выбран фильтр по Дате 
      if (req.body.column === 'date') {
        let result = await collection.find({}).toArray()
        const newRes = result.filter((it) => {
          return new Date(it.date) > new Date(req.body.valueFilter)
        })
        res.json(newRes)
      }
      // фильтруем в БД если колонка не Дата
      let result = await collection.find({
        [req.body.column]: { $gt: req.body.column !== 'title' ? +req.body.valueFilter : req.body.valueFilter }
      }).toArray()
      res.json(result) 
    }
    if (req.body.condition === 'less') {
      if (req.body.column === 'date') {
        let result = await collection.find({}).toArray()
        const newRes = result.filter((it) => {
          return new Date(it.date) < new Date(req.body.valueFilter)
        })
        res.json(newRes)
      }
      let result = await collection.find({
        [req.body.column]: { $lt: req.body.column !== 'title' ? +req.body.valueFilter : req.body.valueFilter }
      }).toArray()
      res.json(result) 
    }
    if (req.body.condition === 'equals') {
      if (req.body.column === 'date') {
        let result = await collection.find({}).toArray()
        const newRes = result.filter((it) => {
          const dateVal = new Date(it.date).getTime()
          const dateValFilter = new Date(req.body.valueFilter).getTime()
          return dateVal === dateValFilter
        })
        res.json(newRes)
      }
      let result = await collection.find({
        [req.body.column]:  req.body.column !== 'title' ?  +req.body.valueFilter : req.body.valueFilter
      }).toArray()
      res.json(result) 
    }
    if (req.body.condition === 'contains') {
      let result = await collection.find({}).toArray()
      const re = new RegExp(`${req.body.valueFilter}`, 'i')
      const newRes = result.filter((it) => {
        return re.test(it[req.body.column])
      })
      res.json(newRes) 
    }

  }
  catch {
   console.log('Error')
  }
}) 

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.listen(PORT, () => {
  console.log('Server start')
})


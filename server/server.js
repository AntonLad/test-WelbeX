import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { resolve } from 'path'
import { Html } from '../src/html.js'

import * as fs from 'fs/promises'

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

server.get('/', (req, res) => {
  res.send('EXP serv')
})

server.get('/api/v1/cities', async (req, res) => {
  const citiList = await fs.readFile(`/mnt/d/dev/skDesign/data/cities.json`, 'utf-8')
    .then((citiData) => {
      return JSON.parse(citiData)
    })
    .catch((e) => console.log('error', e))
   res.json(citiList)
})

server.get('/api/v1/source', async (req, res) => {
  const citiList = await fs.readFile(`/mnt/d/dev/skDesign/data/sources.json`, 'utf-8')
    .then((citiData) => {
      return JSON.parse(citiData)
    })
   res.json(citiList)
})

server.post('/api/v1/form', async (req, res) => {
  const readForms = await fs.readFile(`/mnt/d/dev/skDesign/data/listOfForms.json`, 'utf-8')
    .then((oldForms) => {
      return JSON.parse(oldForms)
    })
    .catch(async () => {
      await fs.writeFile(`/mnt/d/dev/skDesign/data/listOfForms.json`, JSON.stringify([req.body]), 'utf-8')
      .catch((e) => console.log('error', e))    
      res.json({ status: 'success' })
    })

  await fs.writeFile(`/mnt/d/dev/skDesign/data/listOfForms.json`, JSON.stringify([...readForms, req.body]), 'utf-8')
    .catch((e) => console.log('error', e))
  res.json({ status: 'success' })
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


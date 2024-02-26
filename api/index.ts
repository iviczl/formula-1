import express, { Express, Request, Response } from 'express'
// const express = require('express')

const app: Express = express()
const port = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

app.get('/hi', (req: Request, res: Response) => {
  res.send('hi2')
})

app.listen(port, () => {
  console.log(`listening on port ${port}.`)
})

import express, { Express, Request, Response } from 'express'
import { readFile } from 'fs/promises'

const port = 8000
const app: Express = express()

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

type Driver = {
  id: number
  code: string
  firstname: string
  lastname: string
  country: string
  team: string
  imgUrl: string
  place: number
}

let drivers: Driver[]
const loadDrivers = async () => {
  try {
    const rawData = JSON.parse((await readFile('./db/drivers.json')).toString())
    drivers = rawData.map((item: any) => ({
      ...item,
      imgUrl: `/static/${(item.code as string).toLowerCase()}.png`,
      place: 0,
    }))

    let orders: number[] = []
    for (let i = 1; i <= drivers.length; i++) {
      orders.push(i)
    }
    shuffleArray(orders)
    drivers.forEach((driver) => (driver.place = orders.pop() ?? 0))
    drivers.sort((a, b) => a.place - b.place)
  } catch (error) {
    console.error(`Error when trying to read the file: {error.message}`)
  }
}
loadDrivers()

app.get('/api/drivers', async (req: Request, res: Response) => {
  res.send(drivers)
})

app.post('/api/drivers/:driverId/overtake', (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId)
  const driver = drivers.find((driver) => driver.id === driverId)
  let succeeded = false

  if (driver && driver.place > 1) {
    const place = driver.place
    const otherPlace = place - 1
    const otherDriver = drivers.find((driver) => driver.place === otherPlace)
    if (otherDriver) {
      driver.place = otherPlace
      otherDriver.place = place
      drivers.sort((a, b) => a.place - b.place)
      succeeded = true
    }
  }
  res.send(succeeded)
})

app.use('/static', express.static('image'))

app.listen(port, () => {
  console.log('service started')
})

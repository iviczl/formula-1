import { useEffect, useState } from 'react'
import { Driver } from '../types'
import { getDrivers, overtake } from '../services'
import Card from '../components/Card'
import './driversPageStyles.css'

const DriversPage = () => {
  const [drivers, setDrivers] = useState(null as Driver[] | null)

  // sets the drivers to the state
  const loadDrivers = async () => {
    const data = await getDrivers()
    if (data) {
      setDrivers(data)
    }
  }

  // overtake action and if it was successful loads the drivers again
  const action = async (driverId: number) => {
    const success = await overtake(driverId)
    if (success) {
      loadDrivers()
    }
  }

  useEffect(() => {
    if (!drivers) {
      loadDrivers()
    }
  }, [drivers])

  if (!drivers) {
    return null
  }

  return (
    <div className='list-container' role='list'>
      {drivers?.map((driver) => (
        <Card
          driver={driver}
          key={driver.id}
          action={() => action(driver.id)}
        />
      ))}
    </div>
  )
}

export default DriversPage

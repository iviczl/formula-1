import { useEffect, useState } from 'react'
import { Driver } from './types'
import { getDrivers } from './services'
import Card from './components/Card'
import './driversPageStyles.css'

const DriversPage = () => {
  const [drivers, setDrivers] = useState(null as Driver[] | null)

  const loadDrivers = async () => {
    const data = await getDrivers()
    if (data) {
      setDrivers(data)
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
    <div className='list-container'>
      {drivers?.map((driver) => (
        <Card driver={driver} key={driver.id} />
      ))}
    </div>
  )
}

export default DriversPage

import { apiBasePath } from '../constants'
import { Driver } from '../types'
import './cardStyles.css'

const Card = ({ driver }: { driver: Driver }) => {
  return (
    <div className='card-container'>
      <h1 className='title'>{`${driver.firstname} ${driver.lastname} (${driver.team})`}</h1>
      <p>{`Place: ${driver.place} Code: ${driver.code}`}</p>
      <img
        src={`${apiBasePath}${driver.imgUrl}`}
        height='200px'
        width='200px'
      />
    </div>
  )
}

export default Card

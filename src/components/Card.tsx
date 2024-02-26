import { apiBasePath } from '../constants'
import { Driver } from '../types'
import './cardStyles.css'

// a card component for a single driver's data
const Card = ({ driver, action }: { driver: Driver; action: () => {} }) => {
  return (
    <article className='card-container' role='listitem'>
      <h1
        className='title'
        role='heading'
      >{`${driver.firstname} ${driver.lastname} (${driver.team})`}</h1>
      <p className='card-row'>
        <span>{`Place: ${driver.place} Code: ${driver.code}`}</span>
        <span>
          {driver.place > 1 ? (
            <button className='action-button' onClick={action}>
              Take over
            </button>
          ) : (
            ''
          )}
        </span>
      </p>
      <img
        src={`${apiBasePath}${driver.imgUrl}`}
        height='200px'
        width='200px'
        loading='lazy'
      />
    </article>
  )
}

export default Card

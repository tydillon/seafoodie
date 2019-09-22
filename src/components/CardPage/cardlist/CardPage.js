import React from 'react'
import { map } from 'ramda'
import RestCard from '../card/Card'
import './CardPage.styles.css'

const CardPage = ({ restaurants, toggleDrawer }) => {
  return (
    <div className='card-list'>
      {map(restaurant => {
        return (
          <RestCard
            key={restaurant.name}
            restaurant={restaurant}
            toggleDrawer={toggleDrawer}
          />
        )
      }, restaurants)}
    </div>
  )
}

export default CardPage

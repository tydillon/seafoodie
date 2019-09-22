import React from 'react'
import { Button } from '@material-ui/core'
import './Start.styles.css'
import Fish from '../../images/fish-clipart.png'
import '../../../node_modules/animate.css'

const Start = () => {
  return (
    <div className='container'>
      <div className='top'>
        <h1 className='title animated fadeIn'>Seafoodie</h1>
      </div>
      <div className='passage animated fadeIn'>
        <img src={Fish} alt='Fish' height='50px' />
        <br />
        <h2>
          Seafoodie aims to make sustainable seafood in the Charleston area
          easily accessible to the general public. Basically, we want to make
          the right choice the easiest choice.
        </h2>
      </div>
      <div className='divider-pic animated fadeIn' />
      <div className='passage animated fadeIn'>
        <p>
          Seafoodie utilized the Good Catch initiative at the South Carolina
          Aquarium to find restaurants. The South Carolina Aquarium Good Catch
          Initiative selects partners that have committed to serving a high
          percentage of sustainable seafood sourced from southeast regional
          fisheries.
        </p>
        <p>
          Learn more about the Good Catch initiative <br />
          <Button
            className='cardButton'
            href='https://scaquarium.org/conservation/goodcatch/'
          >
            here
          </Button>
        </p>
      </div>
      <div className='footer'>
        Seafoodie was made by Tyler Dillon | Click <a href='/signin'>here</a>{' '}
        for admin privileges
        <br />
      </div>
    </div>
  )
}

export default Start

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button } from '@material-ui/core/'
import Styles from './Card.styles'

const useStyles = makeStyles(Styles)

const RestCard = ({ restaurant, toggleDrawer }) => {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          {restaurant.img.length > 0 && (
            <img
              className={classes.logo}
              src={restaurant.img}
              alt={restaurant.name}
            />
          )}
          {restaurant.img.length === 0 && (
            <Typography variant='h5' component='h2'>
              {restaurant.name}
            </Typography>
          )}
          <Typography className={classes.pos} color='textSecondary'>
            {restaurant.neighborhood}
          </Typography>
          <Button
            className={classes.cardButton}
            onClick={toggleDrawer(true)}
            id={restaurant._id}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default RestCard

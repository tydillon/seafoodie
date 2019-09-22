import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Button,
  ButtonGroup,
  Grid
} from '@material-ui/core'
import { merge, map } from 'ramda'
import { navigate } from '@reach/router'
import Styles from './Add.styles.js.js.js'

const useStyles = makeStyles(Styles)

const AddForm = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    neighborhood: '',
    phone: '',
    address: '',
    url: '',
    image: ''
  })
  const [gps, setGPS] = useState({ lat: '', lng: '' })

  const handleChange = e => {
    if (e.target.id) {
      if (e.target.id === 'gps') {
        setGPS(merge(gps, { [e.target.name]: e.target.value }))
      } else {
        setRestaurant(merge(restaurant, { [e.target.id]: e.target.value }))
      }
    } else {
      setRestaurant(merge(restaurant, { [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = e => {
    const reqBody = JSON.stringify({
      name: restaurant.name,
      neighborhood: restaurant.neighborhood,
      phone: restaurant.phone,
      url: restaurant.url,
      address: restaurant.address,
      gps: gps,
      img: restaurant.image
    })
    e.preventDefault()
    fetch('http://localhost:8005/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(navigate('/map'))
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className={classes.harbor} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          {/* <Paper className={classes.paper}> */}
          <h1 className={classes.title}>Add A New Restaurant</h1>
          <form>
            <br />
            {map(
              item => {
                return (
                  <div key={item}>
                    <TextField
                      key={`rest${item}`}
                      label={`Restaurant ${item}`}
                      className={classes.textField}
                      value={restaurant.item}
                      onChange={handleChange}
                      margin='normal'
                      id={`${item.toLowerCase()}`}
                    />
                    <br />
                  </div>
                )
              },
              ['Name', 'Phone', 'Address', 'URL', 'Image']
            )}
            <TextField
              id='gps'
              name='lat'
              label='Latitude'
              className={classes.textField}
              value={gps.lat}
              onChange={handleChange}
              margin='normal'
            />
            <br />
            <TextField
              id='gps'
              name='lng'
              label='Longitude'
              className={classes.textField}
              value={gps.lng}
              onChange={handleChange}
              margin='normal'
            />
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='neighborhood-helper'>
                Neighborhood
              </InputLabel>
              <Select
                id='neighborhood'
                value={restaurant.neighborhood}
                onChange={handleChange}
                input={<Input name='neighborhood' id='neighborhood-helper' />}
              >
                {' '}
                {map(
                  hood => {
                    return (
                      <MenuItem value={hood} key={hood}>
                        {hood}
                      </MenuItem>
                    )
                  },
                  [
                    'Isle of Palms',
                    "Sullivan's Island",
                    'Folly Beach',
                    'Downtown Charleston',
                    'Mt Pleasant',
                    'North Charleston',
                    'James Island',
                    'West Ashley',
                    'Daniel Island'
                  ]
                )}
              </Select>
            </FormControl>
            <br />
            <br />
            <ButtonGroup aria-label='Small outlined button group'>
              <Button type='submit' onClick={handleSubmit}>
                Submit Restaurant
              </Button>
            </ButtonGroup>
          </form>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  )
}

export default AddForm

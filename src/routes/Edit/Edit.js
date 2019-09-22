import React, { useState, useEffect } from 'react'
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
  Dialog,
  DialogTitle,
  Grid,
  Paper
} from '@material-ui/core'
import { merge, map, find, propEq, sortBy, compose, toLower, prop } from 'ramda'
import AddMenu from '../../components/new-menu-item/AddMenu'
import { navigate } from '@reach/router'
import Styles from './Edit.styles.js'

const useStyles = makeStyles(Styles)

const EditForm = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [allRests, setAllRests] = useState([])
  const [restaurant, setRestaurant] = useState({
    _id: '',
    name: '',
    neighborhood: '',
    phone: '',
    address: '',
    url: '',
    img: '',
    menu: []
  })
  const [gps, setGPS] = useState({ lat: '', lng: '' })
  const [activeMenu, setActiveMenu] = useState({
    name: '',
    price: '',
    description: '',
    tod: [],
    tags: []
  })

  useEffect(() => {
    if (!user.loggedIn) {
      alert('Only administrators can edit restaurants. Redirecting to home')
      navigate('/')
    }
  }, [user.loggedIn])

  useEffect(() => {
    fetch('http://localhost:8005/restaurants')
      .then(res => res.json())
      .then(rests => {
        const sorting = sortBy(
          compose(
            toLower,
            prop('name')
          )
        )
        setAllRests(sorting(rests.data))
      })
  }, [])

  const handleDelete = () => {
    const answer = window.confirm(
      `Are you sure you want to delete ${restaurant.name}?`
    )
    if (answer) {
      fetch(`http://localhost:8005/restaurants/${restaurant._id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(navigate('/map'))
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRestSelect = e => {
    fetch(`http://localhost:8005/restaurants/${e.target.value}`)
      .then(res => res.json())
      .then(rest => {
        setRestaurant(rest.restaurant)
        setGPS(rest.restaurant.gps)
      })
  }

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
      menu: restaurant.menu,
      img: restaurant.img,
      address: restaurant.address,
      gps: gps
    })
    e.preventDefault()
    fetch(`http://localhost:8005/restaurants/${restaurant._id}`, {
      method: 'PUT',
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
      <h1 className={classes.title}>Edit a Restaurant</h1>
      <Grid container spacing={3} alignItems='center' justify='center'>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='restaurant-helper'>
                Select a Restaurant to Edit
              </InputLabel>
              <Select
                id='restaurant'
                value={restaurant.name}
                onChange={handleRestSelect}
                input={<Input name='restaurant' id='restaurant-helper' />}
              >
                {' '}
                {map(rest => {
                  return (
                    <MenuItem value={rest._id} key={rest.name}>
                      {rest.name}
                    </MenuItem>
                  )
                }, allRests)}
              </Select>
            </FormControl>
            {restaurant.name && (
              <form>
                <br />
                <img
                  src={restaurant.img}
                  alt={restaurant.name}
                  height='100px'
                />
                <br />
                <TextField
                  label={`Name`}
                  className={classes.textField}
                  value={restaurant.name}
                  onChange={handleChange}
                  margin='normal'
                  name='name'
                />
                <br />
                <TextField
                  label={`Phone Number`}
                  className={classes.textField}
                  value={restaurant.phone}
                  onChange={handleChange}
                  margin='normal'
                  name='phone'
                />
                <br />
                <TextField
                  label={`Address`}
                  className={classes.textField}
                  value={restaurant.address}
                  onChange={handleChange}
                  margin='normal'
                  name='address'
                />
                <br />
                <TextField
                  label={`Website URL`}
                  className={classes.textField}
                  value={restaurant.url}
                  onChange={handleChange}
                  margin='normal'
                  name='url'
                />
                <br />
                <TextField
                  label={`Restaurant Logo`}
                  className={classes.textField}
                  value={restaurant.img}
                  onChange={handleChange}
                  margin='normal'
                  name='img'
                />
                <br />
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
                    input={
                      <Input name='neighborhood' id='neighborhood-helper' />
                    }
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
                <h3>Menu Items</h3>
                {restaurant.menu && (
                  <p>
                    {map(
                      item => (
                        <Button
                          onClick={e => {
                            // e.preventDefault()

                            setActiveMenu(
                              find(
                                propEq('name', e.currentTarget.id),
                                restaurant.menu
                              )
                            )
                            // console.log(activeMenu)
                            handleClickOpen()
                          }}
                          key={item.name}
                          id={item.name}
                        >
                          {item.name}
                        </Button>
                      ),
                      restaurant.menu
                    )}
                  </p>
                )}

                <ButtonGroup aria-label='Small outlined button group'>
                  <Button
                    onClick={() => {
                      setActiveMenu({
                        name: '',
                        price: '',
                        description: '',
                        tod: [],
                        tags: []
                      })
                      handleClickOpen()
                    }}
                  >
                    Add a Menu Item
                  </Button>
                  <Button type='submit' onClick={handleSubmit}>
                    Update Restaurant
                  </Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </ButtonGroup>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        {activeMenu.name.length > 0 && (
          <DialogTitle id='simple-dialog-title'>
            Edit {activeMenu.name}
          </DialogTitle>
        )}
        {activeMenu.name.length === 0 && (
          <DialogTitle id='simple-dialog-title'>
            Add A New Menu Item
          </DialogTitle>
        )}
        <AddMenu
          restaurant={restaurant}
          setRestaurant={setRestaurant}
          handleClose={handleClose}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </Dialog>
    </div>
  )
}

export default EditForm

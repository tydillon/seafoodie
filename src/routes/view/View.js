import React, { useState, useEffect } from 'react'
import {
  Input,
  Paper,
  Tabs,
  Tab,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core'
import { sortBy, compose, toLower, prop } from 'ramda'
import RestMap from '../../components/MapPage/RestMap'
import CardPage from '../../components/CardPage/cardlist/CardPage'
import './RestMenu.styles.js'
import { makeStyles } from '@material-ui/core/styles'
import { map, filter } from 'ramda'
import Drawer from '../../components/Drawer/Drawer'
import Styles from './RestMenu.styles'

const useStyles = makeStyles(Styles)

const MapMenu = () => {
  const [restaurants, setRestaurants] = useState([])
  const [viewMap, setViewMap] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredRests, setFilteredRests] = useState([])
  const [activeRest, setActiveRest] = useState({ menu: [] })
  const [value, setValue] = useState(0)
  const [neighborhoods, setNeighborhoods] = useState([])
  const [drawer, setDrawer] = useState(false)
  const classes = useStyles()

  function handleTab(newValue) {
    setValue(newValue)
  }

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
        setFilteredRests(sorting(rests.data))
        setRestaurants(sorting(rests.data))
      })
  }, [])

  useEffect(() => {
    let list = []
    map(rest => {
      if (list.indexOf(rest.neighborhood) < 0) {
        list.push(rest.neighborhood)
      }
    }, restaurants)
    setNeighborhoods(list)
  }, [restaurants])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleHoodChange = e => {
    const selected = e.target.value
    if (selected === 'none') {
      setFilteredRests(restaurants)
    } else {
      const filteredhoods = filter(currentRests => {
        return currentRests.neighborhood === selected
      }, restaurants)
      setFilteredRests(filteredhoods)
    }
  }

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    if (event.currentTarget.id) {
      fetch(`http://localhost:8005/restaurants/${event.currentTarget.id}`)
        .then(res => res.json())
        .then(res => setActiveRest(res.restaurant))
    }
    setDrawer(open)
  }

  const filtered = filteredRests.filter(currentRests =>
    currentRests.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={classes.menubar}>
      {restaurants.length > 0 && (
        <React.Fragment>
          <Drawer
            toggleDrawer={toggleDrawer}
            restaurant={activeRest}
            drawer={drawer}
          />
          <div className={classes.menucont}>
            <div className='left'>
              <Input
                onChange={handleChange}
                placeholder='Search for a restaurant by name'
                className={classes.searchbar}
              />{' '}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='age-simple'>
                  Select Neighborhood
                </InputLabel>
                <Select onChange={handleHoodChange} value='neighborhood'>
                  <MenuItem value='none'>None</MenuItem>
                  {map(
                    hood => (
                      <MenuItem key={hood} value={hood}>
                        {hood}
                      </MenuItem>
                    ),
                    neighborhoods
                  )}
                </Select>
              </FormControl>
            </div>
            <div className={classes.right}>
              <Paper className={classes.root}>
                <Tabs
                  value={value}
                  onChange={handleTab}
                  indicatorColor='primary'
                  textColor='primary'
                  centered
                >
                  <Tab label='Card View' onClick={() => setViewMap(false)} />
                  <Tab label='Map View' onClick={() => setViewMap(true)} />
                </Tabs>
              </Paper>
            </div>
          </div>
          <div className={classes.container}>
            {viewMap && (
              <RestMap
                restaurants={filtered}
                setActiveRest={setActiveRest}
                toggleDrawer={toggleDrawer}
              />
            )}
            {!viewMap && (
              <CardPage restaurants={filtered} toggleDrawer={toggleDrawer} />
            )}
          </div>
        </React.Fragment>
      )}
      {restaurants.length === 0 && (
        <div>
          <p>
            Whoops! Seems like you aren't connected to the server or an
            administrator hasn't added any restaurants to your database yet! Add
            some restaurants and come back to this page later!
          </p>
        </div>
      )}
    </div>
  )
}

export default MapMenu

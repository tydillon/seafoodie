import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  ButtonGroup
} from '@material-ui/core'
import { merge, includes, append, without, map, findIndex, propEq } from 'ramda'
import Styles from './addmenu.style'

const useStyles = makeStyles(Styles)

const AddMenu = ({
  restaurant,
  setRestaurant,
  handleClose,
  activeMenu,
  setActiveMenu
}) => {
  const classes = useStyles()

  const handleMenuChange = e => {
    setActiveMenu(merge(activeMenu, { [e.target.name]: e.target.value }))
  }

  const handleCheckedTod = name => includes(name, activeMenu.tod)

  const handleCheckedTags = tag => includes(tag, activeMenu.tags)

  const handleCheckedChangeTod = e => {
    if (!includes(e.target.value, activeMenu.tod)) {
      setActiveMenu(
        merge(activeMenu, { tod: append(e.target.value, activeMenu.tod) })
      )
    } else {
      setActiveMenu(
        merge(activeMenu, { tod: without(e.target.value, activeMenu.tod) })
      )
    }
  }

  const handleCheckedChangeTags = e => {
    if (!includes(e.target.value, activeMenu.tags)) {
      setActiveMenu(
        merge(activeMenu, { tags: append(e.target.value, activeMenu.tags) })
      )
    } else {
      setActiveMenu(
        merge(activeMenu, { tags: without(e.target.value, activeMenu.tags) })
      )
    }
  }

  const handleSubmit = e => {
    const ind = findIndex(propEq('name', activeMenu.name), restaurant.menu)
    console.log(ind)
    if (!ind >= 0) {
      setRestaurant(
        merge(restaurant, restaurant.menu.splice(ind, 1, activeMenu))
      )
    } else {
      setRestaurant(
        merge(restaurant, { menu: append(activeMenu, restaurant.menu) })
      )
    }
    handleClose()
  }

  return (
    <form>
      <TextField
        name='name'
        label='Menu Item Name'
        className={classes.textField}
        value={activeMenu.name}
        onChange={handleMenuChange}
        margin='normal'
      />
      <br />
      <TextField
        name='price'
        label='Price'
        className={classes.textField}
        value={activeMenu.price}
        onChange={handleMenuChange}
        margin='normal'
      />
      <br />
      <TextField
        multiline
        rows={3}
        name='description'
        label='Description'
        className={classes.textField}
        value={activeMenu.description}
        onChange={handleMenuChange}
        margin='normal'
      />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Time of Day</FormLabel>
            <FormGroup>
              {map(
                item => {
                  return (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={handleCheckedTod(item.toLowerCase())}
                          onChange={handleCheckedChangeTod}
                          value={item.toLowerCase()}
                        />
                      }
                      label={item}
                    />
                  )
                },
                ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Other']
              )}
              <br />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Food Type</FormLabel>
            <FormGroup>
              {map(
                item => {
                  return (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={handleCheckedTags(item.toLowerCase())}
                          onChange={handleCheckedChangeTags}
                          value={item.toLowerCase()}
                        />
                      }
                      label={item}
                    />
                  )
                },
                [
                  'Shrimp',
                  'Oyster',
                  'Calamari',
                  'Scallop',
                  'Clam',
                  'Crab',
                  'Lobster',
                  'Flounder',
                  'Salmon',
                  'Haddock',
                  'Tuna',
                  'Mahi Mahi',
                  'Swordfish',
                  'Fish'
                ]
              )}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <ButtonGroup aria-label='Small outlined button group'>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit Item</Button>
      </ButtonGroup>
    </form>
  )
}

export default AddMenu

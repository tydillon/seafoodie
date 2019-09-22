import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Styles from './MenuModal.styles'
import { filter, includes, map } from 'ramda'

const useStyles = makeStyles(Styles)

export default function SimpleDialog({ onClose, open, menu, name }) {
  const classes = useStyles()
  const [filtered, setFiltered] = useState({})
  const [types, setTypes] = useState([])

  //throws error in the console because it's not giving a key to mapped items
  useEffect(() => {
    let list = []
    map(item => {
      map(tag => {
        if (list.indexOf(tag) < 0) {
          list.push(tag)
        }
      }, item.tags)
    }, menu)
    setTypes(list)
  }, [menu])

  useEffect(() => {
    console.log(menu)
    setFiltered(menu)
  }, [menu])

  const handleTypeChange = e => {
    const selected = e.target.value
    if (selected === 'none') {
      setFiltered(menu)
    } else {
      const filteredTypes = filter(menuItem => {
        return includes(selected, menuItem.tags)
      }, menu)
      setFiltered(filteredTypes)
    }
  }

  return (
    <Dialog onClose={onClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>
        {name} Seafood Menu Items
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-simple'>Select Type of Food</InputLabel>
          <Select onChange={handleTypeChange} value='type'>
            <MenuItem value='none'>View All</MenuItem>
            {map(
              type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ),
              types
            )}
          </Select>
        </FormControl>
      </DialogTitle>
      <DialogContent dividers>
        <React.Fragment>
          {map(
            item => (
              <ExpansionPanel key={item._id}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  key={item._id}
                >
                  <Typography className={classes.heading}>
                    {item.name}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {item.description}
                    <br />
                    {item.price}
                    <br />
                    Served at:{' '}
                    {item.tod.map((time, index) => {
                      if (index === 0) {
                        return <span>{time}</span>
                      } else {
                        return <span>, {time}</span>
                      }
                      // }, filtered)}
                    })}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ),
            filtered
          )}
        </React.Fragment>
      </DialogContent>
    </Dialog>
  )
}

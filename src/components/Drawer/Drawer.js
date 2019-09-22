import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import DrawerMap from './DrawerMap'
import { Button } from '@material-ui/core'
import SimpleDialog from '../MenuModal/MenuModal'
import Styles from './Drawer.styles.js'

const useStyles = makeStyles(Styles)

const TemporaryDrawer = ({ restaurant, drawer, toggleDrawer }) => {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleClickOpen() {
    setMenuOpen(true)
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  const formatPhoneNumber = phoneNumberString => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  return (
    <div>
      <Drawer anchor='right' open={drawer} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role='presentation'
          onKeyDown={toggleDrawer(false)}
        >
          <img
            className={classes.logo}
            src={restaurant.img}
            alt={restaurant.name}
          />
          <div className={classes.drawerInfo}>
            <h5>{restaurant.address}</h5>
            <h5>{formatPhoneNumber(restaurant.phone)}</h5>
            <Button
              href={restaurant.url}
              className={classes.drawerButton}
              target='_blank'
            >
              Visit Website
            </Button>
            <Button
              variant='outlined'
              className={classes.drawerButton}
              onClick={handleClickOpen}
            >
              View Seafood Items on Menu
            </Button>
            <br />
            <SimpleDialog
              open={menuOpen}
              onClose={handleClose}
              menu={restaurant.menu}
              name={restaurant.name}
            />
          </div>
          <DrawerMap restaurant={restaurant} />
        </div>
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer

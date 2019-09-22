import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core'
import Styles from './NavBar.styles.js'
import { navigate } from '@reach/router'

const useStyles = makeStyles(Styles)

const NavBar = ({ user, updateUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const logout = e => {
    e.preventDefault()
    console.log('logging out')
    fetch('http://localhost:8005/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          updateUser({
            loggedIn: false,
            username: ''
          })
        }
      })
      .catch(err => {
        console.log('Logout error')
      })
    navigate('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' edge='start' className={classes.index}>
        <Toolbar>
          <Typography variant='h6' edge='start' className={classes.seafoodie}>
            CHS Seafoodie
          </Typography>
          <div className={classes.title} />
          <Button color='inherit' href='/'>
            Home
          </Button>
          <Button color='inherit' href='/inseason'>
            What's in Season?
          </Button>
          <Button color='inherit' href='/map'>
            View Restaurants
          </Button>
          {user.loggedIn === true && (
            <React.Fragment>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                color='inherit'
                onClick={handleClick}
              >
                Admin Options
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/add')
                    handleClose()
                  }}
                >
                  Add a Restaurant
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/edit')
                    handleClose()
                  }}
                >
                  Edit a Restaurant
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/signup')
                    handleClose()
                  }}
                >
                  Add a new Admin
                </MenuItem>
              </Menu>
              <Button color='inherit' onClick={logout}>
                Log Out
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar

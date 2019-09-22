//api header needs to include 'Authorization': `Basic btoa(username:password)`

import React, { useState } from 'react'
import { Grid, Paper, FormControl, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Styles from './SignIn.styles'
import { navigate } from '@reach/router'

const useStyles = makeStyles(Styles)

const SignIn = ({ updateUser }) => {
  const classes = useStyles()
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(values)
    fetch('http://localhost:8005/users/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res
        } else if (res.status === 401) {
          alert('Incorrect username or password')
        } else {
          throw new Error('Login unsuccessful')
        }
      })
      .then(res => res.json())
      .then(res => {
        // update state in App.js
        updateUser({
          loggedIn: true,
          username: res.username
        })
      })
      .then(res => navigate('/'))
      .catch(err => {
        console.error(err)
        alert('Error logging in please try again')
      })
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Sign In</h1>
      <Grid container spacing={3} alignItems='center' justify='center'>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id='standard-name'
                label='Username'
                className={classes.textField}
                value={values.username}
                onChange={handleChange('username')}
                margin='normal'
              />
              <TextField
                id='standard-name'
                label='Password'
                type='password'
                className={classes.textField}
                value={values.password}
                onChange={handleChange('password')}
                margin='normal'
              />
              <Button onClick={handleSubmit}>Submit</Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignIn

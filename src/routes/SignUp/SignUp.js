import React, { useState, useEffect } from 'react'
import { Grid, Paper, FormControl, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Styles from './SignUp.styles'
import { navigate } from '@reach/router'

const useStyles = makeStyles(Styles)

const SignUp = ({ user }) => {
  const classes = useStyles()
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    if (!user.loggedIn) {
      alert('Only administrators can register new admins. Redirecting to home')
      navigate('/')
    }
  }, [user.loggedIn])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = e => {
    const reqBody = JSON.stringify({
      username: values.username,
      password: values.password
    })
    e.preventDefault()
    console.log(values)
    fetch('http://localhost:8005/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody
    })
      .then(resp => resp.json())
      .then(res => {
        if (!res.error) {
          console.log('SignUp Successful')
          navigate('/signin')
        } else {
          alert(res.error)
          console.log('username already in use')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Register a new Administrator Account</h1>
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
              <Button
                onClick={() => {
                  navigate('/')
                }}
              >
                Cancel
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignUp

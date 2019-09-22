import React, { useState, useEffect } from 'react'
import Start from './routes/start/Start'
import './App.css'
import NavBar from './components/navbar/NavBar'
import AddForm from './routes/Add/Add'
import EditForm from './routes/Edit/Edit'
import InSeason from './routes/InSeason/InSeason'
import RestMenu from './routes/view/View.js'
import SignIn from './routes/SignIn/SignIn'
import SignUp from './routes/SignUp/SignUp'
import { Router } from '@reach/router'

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('SeaFoodieUser')) || {
      loggedIn: false,
      username: ''
    }
  )

  useEffect(() => {
    localStorage.setItem('SeaFoodieUser', JSON.stringify(user))
  }, [user])

  return (
    <div className='App'>
      <NavBar user={user} updateUser={setUser} />
      <Router>
        <Start path='/' />
        <InSeason path='/inseason' />
        <AddForm path='/add' user={user} />
        <EditForm path='/edit' user={user} />
        <RestMenu path='/map' />
        <SignIn path='/signin' updateUser={setUser} />
        <SignUp path='/signup' user={user} />
      </Router>
    </div>
  )
}

export default App

// Packages
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

// Custom componentd
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import New from './pages/New'

const Content = props => {

  let [posts, setPosts] = useState([])

  useEffect (() => {
callApi()

  },[])

  const callApi = () => {
  axios.get(process.env.REACT_APP_SERVER_URL + 'posts')
.then(response => {
  let data = response.data
  console.log('here is the data', data)
  setPosts(data)
})
.catch(err => {
  console.log('Error!', err)
  })
}

  return (
    <div className="container">
  
      <Route exact path="/" render={
        () => <Home posts={posts} />
      } />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/new" render={
          () => <New post={props.post} user={props.post}/>
        } />
    </div>
  )
}

export default Content

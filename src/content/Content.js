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
import Faves from './pages/Faves'
import More from './pages/More'
import Edit from './pages/Edit'

const Content = props => {


  let [posts, setPosts] = useState([])
  let [currentPost, setCurrentPost] = useState('')


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

const handleCurrentPost = (e, post) => {
  console.log('reseting the current post for editing to', post);
  setCurrentPost(post)
}

  return (
    <div className="container">
      <Route exact path="/more/:id" render={
        (props) => <div><More id={props.match.params.id} /></div>
      } />
      <Route exact path="/" render={
        () => <Home user={props.user} />
      } />
      <Route path="/faves" render={
          () => <Faves user={props.user} />
        } />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} posts={posts} handleCurrentPost={handleCurrentPost} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/new" render={
        () => <New post={props.post} user={props.user} />
      } />
    <Route path="/edit" render={
        () => <Edit user={props.user} post={currentPost} />
      } />
    </div>
  )
}

export default Content

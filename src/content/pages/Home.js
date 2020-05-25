import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as ReactBootStrap from "react-bootstrap"
import {  Link } from 'react-router-dom'
const Home = props => {
  let [posts, setPosts] = useState([])
  useEffect (() => {
    callApi()
  },[])
  const callApi = () => {
    // console.log('yooo', props.user._id);
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
  const handleSubmit = (postId) => {
    console.log('asdfasdf')
    console.log('POST', postId);
    console.log('USERID', props.user._id);
    let token = localStorage.getItem('boilerToken')
    // e.preventDefault()
    fetch(process.env.REACT_APP_SERVER_URL + 'faves',{
      method: 'POST', 
      body: JSON.stringify({
        userId: props.user._id,
        postId: postId
      }),
      headers: {
      'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`
      }
    })
    .then(response =>{
      response.json()
      console.log(response)
    }
  )
}
if (props.user){
  let posters = posts.map((p, index) => {
    return (
      <div key={index} id="homepost" >
        <Link to={`/more/${p._id}`}>
        <img variant="top" id="homepic" src={p.pic} alt={p.caption} />
        <p>{p.caption}</p>
      </Link>
        <button onClick={() => {handleSubmit(p._id)}}>Like</button>
      </div>
    )
  })
    return (
      <div>
        {posters}
      </div>
    )
  }
return (
<div>
  <h1> Welcome to our Social Media Site </h1>
</div>
)
}
export default Home
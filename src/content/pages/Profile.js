import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')


  useEffect(() => {
    // Get the token from local storage
    let token = localStorage.getItem('boilerToken')

    // Make a call to a protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response', response)

      // Make sure we got a good response
      if (!response.ok) {
        setSecretMessage('Nice try!')
        return
      }

      // We did get a good response
      response.json()
      .then(result => {
        console.log(result)
        setSecretMessage(result.message)
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you!')
    })
  })

  // Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/login" />
  }


  let posters = props.posts.map((p) => {
    return (
<div>
 <div id="profileposts">
   <img id="homepic" src={p.pic} alt={p.caption} />
   <h2>{p.content}</h2>
   <h3>{p.caption}</h3>
 </div>
 <br/>
</div>
    )
  })

  return (
    <div>
      <div id="userInfo">
      <img src={props.user.pic} alt={props.user.firstname} />
      <h1 id="profileName">
        {props.user.firstname}
      </h1>
      </div>
    <div>
    {posters}
    </div>

    </div>
  )
}

export default Profile


// const callApi = () => {
// axios.get(process.env.REACT_APP_SERVER_URL + 'profile', {
//   headers: { 'Authorization': 'Any string will do' }
// })

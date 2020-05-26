import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'


const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')
  let token = localStorage.getItem('boilerToken')

  // console.log('PROPS', props)
  const handleDelete = (id) => {
      fetch(process.env.REACT_APP_SERVER_URL + "posts/" + id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.status === 204 ? {} : response.json())
      .then(() => {
        console.log('Successful DELETE!')
        window.location.reload(false);
      })
    }


  useEffect(() => {
    // Get the token from local storage

    // Make a call to a protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
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



  var posters = props.posts.map((p) => {
    if (p.user === props.user._id) {
    return (


 <div id="profilePost">
 < Link to={`/more/${p._id}`}>

   <img id="profilePostPic" src={p.pic} alt={p.caption} />
   <h2>{p.content}</h2>
   <h3>{p.caption}</h3>
   </Link>
  <button class="edit" onClick={() => {
      handleDelete(p._id)

    }}><span role="img" aria-label="img">🗑</span></button>
  <Link to={`/edit/${p._id}`}><button class="edit" onClick={(e) => props.handleCurrentPost(e, p._id)} ><span role="img" aria-label="img">✏</span></button></Link>

 </div>


    )
  }
  })
  return (
    <div>
      <div >
      <img id="profilePic" src={props.user.pic} alt={props.user.firstname} />
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

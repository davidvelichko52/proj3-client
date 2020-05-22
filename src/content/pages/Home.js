import React from 'react'
import * as ReactBootStrap from "react-bootstrap"

const Home = props => {
const handleClick = (postId) => {
  fetch(process.env.REACT_APP_SERVER_URL + 'faves/' + postId)

  .then(response => {
    console.log('RESPONSE', response)
    // Handle non-200 responses
    if (!response.ok) {
      return
    }

    // We got a good (200) response, get the token
    response.json()
    .then(result => {
      console.log('Result:', result)
      // Giving the token back up to App.js
    })
  })
  .catch(err => {
    console.log('ERROR SUBMITTING:', err)
  })
}

  let posters = props.posts.map((p) => {
    return (
  <div id="homepost">
  <img variant="top" id="homepic" src={p.pic} alt={p.caption} />
  <p>{p.caption}</p>
  <button onClick={() => handleClick(p._id)}>Like</button>
</div>
    )
  })
  

  return (
    <div>
     {posters}
    </div>
    
   
  )
}

export default Home

import React from 'react'
import * as ReactBootStrap from "react-bootstrap"


  
const Home = props => {
  const handleSubmit = (e) => {
    let token = localStorage.getItem('boilerToken')
    e.preventDefault()
    fetch(process.env.REACT_APP_SERVER_URL + 'faves',{
      method: 'POST', 
      body: JSON.stringify({
        userId: props.user.id,
        postId: e.currentTarget.value
      }),
      headers: {
      'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`
      }
    })
    .then(response =>{webkitConvertPointFromNodeToPage
      response.json()
      console.log(response)
    }
  )
}

  if (props.user){
    let posters = props.posts.map((p) => {
      return (
  
        <div id="homepost" >
          <img variant="top" id="homepic" src={p.pic} alt={p.caption} />
          <p>{p.caption}</p>
          <form onSubmit={handleSubmit}>
            <button type='submit'>Like</button>
            <input type='hidden' value={p._id} />
          </form>
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

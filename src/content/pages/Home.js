import React from 'react'
import * as ReactBootStrap from "react-bootstrap"

const Home = props => {

  let posters = props.posts.map((p) => {
    return (
<div>
  <div id="homepost">
  <img variant="top" id="homepic" src={p.pic} alt={p.caption} />
  
    <h2>{p.content}</h2>
    <p>{p.caption}</p>
  </div>
 <br/>
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

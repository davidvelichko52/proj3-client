import React from 'react'

const Home = props => {

  let posters = props.posts.map((p) => {
    return (
  <h2>{p.content}</h2>
  
    )
  })
  


  return (
    <div>
     {posters}
    </div>
  )
}

export default Home

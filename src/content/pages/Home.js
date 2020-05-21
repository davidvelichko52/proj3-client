import React from 'react'

const Home = props => {

  let posters = props.posts.map((p) => {
    return (
<div>
 <img id="homepic" src={p.pic} alt={p.caption} />
    <h2>{p.content}</h2>
  <h3>{p.caption}</h3>
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

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'


const More = (props) => {
    let [comment, setComment] = useState('')
    let [post, setPost] = useState({})
    let [showComment, setShowComment] = useState(<p></p>)

     
useEffect(() => {
  let token = localStorage.getItem('boilerToken')
  fetch(process.env.REACT_APP_SERVER_URL + 'posts/more/' + props.id, {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(result => { 
    setPost(result)
    setShowComment(result.comments.map((p) => {
    
      return (
        <h3>{p.content}</h3>
      )
    }))
  })
  
  
}, [])

const handleSubmit = e => {
  let token = localStorage.getItem('boilerToken')
  e.preventDefault()

 console.log('submit:', comment)
  fetch(process.env.REACT_APP_SERVER_URL + 'posts/more/' + props.id, {
      method: 'POST',
      body: JSON.stringify({
       content: comment
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
      .catch(err => {
          console.log('ERROR SUBMITTING:', err)
        })
        window.location.reload(false);
  }

  console.log('post is', post.comments)
  
  
  

    
      return (
<div>
      <div id="userInfo">
      <img id="morepic" src={post.pic} alt={post.firstname} />
      <h2>{post.content}</h2>
      <h2>{post.caption}</h2>
          {showComment}
</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" rows="5" cols="18" placeholder="Comment" onChange={e => setComment(e.target.value)}/>
        </div>
        <br />
        <button type="submit">Sign Me Up!</button>
      </form>
</div>
      )
    }

export default More
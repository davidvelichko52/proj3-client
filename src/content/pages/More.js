import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'


const More = (props) => {
    let [comment, setComment] = useState('')
    let [post, setPost] = useState({})
console.log(props)
     
useEffect(() => {
  let token = localStorage.getItem('boilerToken')
  fetch(process.env.REACT_APP_SERVER_URL + 'posts/more/' + props.id, {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
    setPost(result)
  })
  
}, [])

    
      return (
    
    <div>
      <div id="userInfo">
      <img id="morepic" src={post.pic} alt={post.firstname} />
      <h2>{post.content}</h2>
      <h2>{post.caption}</h2>
      <h2>{post.comment}</h2>
</div>
      <form>
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
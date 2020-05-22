import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const More = props => {
    let [comment, setComment] = useState('')

    let posters = props.posts.map((p) => {
        return (
    <div>
     <img id="homepic" src={p.pic} alt={p.caption} />
        <h2>{p.content}</h2>
      <h3>{p.caption}</h3>
        <h4>{p.comment}</h4>
    </div>
        )
      })


      const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
    
        console.log('submit', comment)
        fetch(process.env.REACT_APP_SERVER_URL + 'posts/new', {
            method: 'POST',
            body: JSON.stringify({
             comment
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response =>{
            response.json()
            window.location.reload(false);
    
          }
        )
    
            .catch(err => {
                console.log('ERROR SUBMITTING:', err)
              })
        }
      
    
      return (
    <div>
    <div>
      <form onSubmit={handleSubmit}>
     
        <div>
          <h3>Comment:</h3>
          <input name="content" rows="5" cols="18" onChange={e => setComment(e.target.value)}/>
        </div>
  
        <br />
        <button type="submit">Sign Me Up!</button>

      </form>
    </div>
         {posters}
    </div>
      )
    }

export default More
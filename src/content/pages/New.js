import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const New = props => {
let [pic, setPic] = useState('')
let [content, setContent] = useState('')
let [caption, setCaption] = useState('')
let [isSubmit, setIsSubmit] = useState(false)



const handleSubmit = e => {
    let token = localStorage.getItem('boilerToken')
    e.preventDefault()

    console.log('submit', pic, content, caption )
    fetch(process.env.REACT_APP_SERVER_URL + 'posts/new', {
        method: 'POST',
        body: JSON.stringify({
         pic,
         content,
         caption
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response =>{ 
        response.json()
        setIsSubmit(true)
        window.location.reload(false);
        
      }
    )
      
        .catch(err => {
            console.log('ERROR SUBMITTING:', err)
          })
    }
  
    if (isSubmit) {
      return <Redirect to="/profile" />
    }


  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Picture Link:</h3>
          <input name="pic" placeholder="link to pic" onChange={e => setPic(e.target.value)} />
        </div>
        <div>
          <h3>Content:</h3>
          <textarea name="content" rows="5" cols="18" onChange={e => setContent(e.target.value)} />
        </div>
        <div>
          <h3>Caption:</h3>
          <input name="caption" placeholder="caption goes here" onChange={e => setCaption(e.target.value)} required/>
        </div>
        <br />
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>

  )
}
export default New



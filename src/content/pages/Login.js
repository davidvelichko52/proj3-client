// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit', email, password)
    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response)
      // Handle non-200 responses
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return
      }

      // We got a good (200) response, get the token
      response.json()
      .then(result => {
        console.log('Result:', result)
        // Giving the token back up to App.js
        props.updateToken(result.token)
      })
    })
    .catch(err => {
      console.log('ERROR SUBMITTING:', err)
    })
  }

  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
            <FormGroup>
            <input placeholder="email" type="email" name="email" onChange={e => setEmail(e.target.value)} />
            </FormGroup>
              <FormGroup>
            <input placeholder="password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
            </FormGroup>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login

// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')


  function showUploadWidget(e) {
    e.preventDefault()
   window.cloudinary.openUploadWidget({
      cloudName: "samtube",
      uploadPreset: "default-preset",
      sources: [
          "local",
          "dropbox",
          "instagram",
          "facebook",
          "camera"
      ],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: false,
      multiple: true,
      defaultSource: "local",
      styles: {
          palette: {
              window: "#000000",
              sourceBg: "#000000",
              windowBorder: "#8E9FBF",
              tabIcon: "#FFFFFF",
              inactiveTabIcon: "#8E9FBF",
              menuIcons: "#2AD9FF",
              link: "#08C0FF",
              action: "#336BFF",
              inProgress: "#00BFFF",
              complete: "#33ff00",
              error: "#EA2727",
              textDark: "#000000",
              textLight: "#FFFFFF"
          },
          fonts: {
              default: null,
              "'Space Mono', monospace": {
                  url: "https://fonts.googleapis.com/css?family=Space+Mono",
                  active: true
              }
          }
      }
  },
   (err, result) => {
     if (!err && result && result.event === "success") {
         console.log('done! Here is the image info: ', result.info);
         setProfileUrl(result.info.secure_url)
       }
    });
   }


  const handleSubmit = e => {
    e.preventDefault()
    // Send the user sign up data to the server
    console.log('submit', email, password)
    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        pic: profileUrl
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
      <h2>Signup</h2>
      <span className="red">{message}</span>

      <form onSubmit={handleSubmit}>
        <FormGroup>

          <input  name="firstname" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
        </FormGroup>
          <FormGroup>
                    <input  name="lastname" placeholder="Your last name" onChange={e => setLastname(e.target.value)} />
        </FormGroup>
          <FormGroup>
            <input placeholder="email" type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
          <FormGroup>
                  <input placeholder="password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
         <FormGroup>
            <button onClick={showUploadWidget}>Upload pics</button>
        </FormGroup>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}

export default Signup

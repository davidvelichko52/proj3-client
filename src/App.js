// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)
  // let [posts, setPosts] = useState([])

  // useEffect hook (on load)
  useEffect(() => {
    decodeToken()
    // callApi()
  }, []) // Empty array, meaning only run this on page load

  const decodeToken = () => {
    // Get the token from the browser's local storage
    let token = localStorage.getItem('boilerToken')

    if (token) {
      // Decrypt the user data from the token
      let decodedUser = jwtDecode(token)

      // If the token is not valid or the expiration date has passed, user stays logged out
      if (!decodedUser || Date.now() > decodedUser.exp * 1000) {
        console.log('Expired or bad token')
        setUser(null)
      }
      else {
        // The user is valid, token is good
        console.log('User and token are good!')
        setUser(decodedUser)
      }
    }
    else {
      // No user logged in
      console.log('There was no token')
      setUser(null)
    }
  }

  const updateToken = (newToken) => {
    // Set the new token into localStorage
    localStorage.setItem('boilerToken', newToken || '')

    // Update the state (basically the user info)
    decodeToken()
  }

//   const callApi = () => {
//   fetch(process.env.REACT_APP_SERVER_URL + 'posts')
//   .then(response => response.json())
// .then(data => {
//   console.log('here is the data', data)
//   setPosts(data)
// })
// .catch(err => {
//   console.log('Error!', err)
//   })
// }



  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken} />
        <Header />
        <main>
          <Content user={user} updateToken={updateToken}/>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

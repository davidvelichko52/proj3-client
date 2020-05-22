import React from 'react'
import { Link } from 'react-router-dom'
import * as ReactBootStrap from "react-bootstrap"


const Nav = props => {
  const handleLogout = e => {
    e.preventDefault()
    // Update the state of the App
    props.updateToken()
  }

  let links = (
    <ReactBootStrap.Nav className="mr-auto"> 
       <Link to="/" >
          <ReactBootStrap.Nav.Link href="#/">Home</ReactBootStrap.Nav.Link>
        </Link>
  
        <Link to="/login" >
          <ReactBootStrap.Nav.Link href="#/login">Login</ReactBootStrap.Nav.Link>
        </Link>
        <Link to="/signup" >
          <ReactBootStrap.Nav.Link href="#/signup">Signup</ReactBootStrap.Nav.Link>
        </Link>
      </ReactBootStrap.Nav>
  )

  // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
     
      <ReactBootStrap.Nav className="mr-auto"> 
        <Link to="/" >
          <ReactBootStrap.Nav.Link href="#/">Home</ReactBootStrap.Nav.Link>
        </Link>
  
       
          <Link to="/profile"> 
          <ReactBootStrap.Nav.Link href="#/profile">Profile</ReactBootStrap.Nav.Link>
          </Link>
    
       
          <Link to="/new">  
          <ReactBootStrap.Nav.Link href="#/new">New Post</ReactBootStrap.Nav.Link>
          </Link>
    
       
          <Link to="/faves">  
          <ReactBootStrap.Nav.Link href="#/faves">Favorites</ReactBootStrap.Nav.Link>
          </Link>
    
       
          <a  className="nav-link" href="/" onClick={handleLogout}>Logout</a>
    
          </ReactBootStrap.Nav>
    )
  }



  return (
  <nav>
    <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    
    {links}
   
    <ReactBootStrap.Nav>
    </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
  </nav>
   
  )
}

export default Nav
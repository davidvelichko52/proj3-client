import React, { useState, useEffect } from 'react'

const Faves = props => {
    let [faves, setFaves] = useState([])

    useEffect (() => {
      getFaves()
    },[])

    const getFaves = () => {
        console.log('props', props);
        let token = localStorage.getItem('boilerToken')

        // this gets the USER ID wherever you want it (on the client)
        let userId = localStorage.getItem('user');
        console.log('user', userId)

        // this fetch gets all FAVES associated with a USER
        fetch(process.env.REACT_APP_SERVER_URL + 'faves/' + userId, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log('JSON', json);
            setFaves(json);
        })
    }


    let faveObjects = faves.map((f, index) => {
        return (
    
          <div key={index} id="homepost" >
            <img variant="top" id="homepic" src={f.pic} alt={f.caption} />
            <p>{f.caption}</p>
          </div>
        )
      })

    return (
        <div>
            <h1>
                faves
            </h1>
            {faveObjects}
        </div>
    )
}

export default Faves
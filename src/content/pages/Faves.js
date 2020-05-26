import React, { useState, useEffect } from 'react'
const Faves = props => {
    let [faves, setFaves] = useState([])
    let [posts, setPosts] = useState([])
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
        fetch(process.env.REACT_APP_SERVER_URL + 'faves/user/' + userId, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json', 'Authorization':  `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log('HERE IS ALL THE JSONS!!!!!', json);
            console.log(json.allFav)
            setFaves(json);
        })
        .finally(() => {
            console.log(faves, 'FAVES')
        })
    }
    let faveObjects = faves.map((f, index) => {
        return (
          <div key={index} id="favePost" >
            <img variant="top" id="favepic" src={f.pic} alt={f.caption} />
            <p>{f.caption}</p>
            <button onClick= { () => {
                 fetch(process.env.REACT_APP_SERVER_URL + 'faves/' + f.faveId, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json' 
                    }
                })
                .then(response => response.json())
                .finally(() => {
                    getFaves()
                })
            }} 
            value={f.faveId}>👎🏻</button>
          </div>
        )
      })
    return (
        <div>
            <h1>
                My Commodities: 
            </h1>
            {faveObjects}
        </div>
    )
}
export default Faves
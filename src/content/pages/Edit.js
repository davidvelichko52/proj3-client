import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import * as ReactBootStrap from "react-bootstrap"

const Edit = props => {
let [pic, setPic] = useState('')
let [content, setContent] = useState('')
let [caption, setCaption] = useState('')
let [isSubmit, setIsSubmit] = useState(false)

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
       setPic(result.info.secure_url)
     }
  });
 }


const handleUpdate = e => {
    let token = localStorage.getItem('boilerToken')
    e.preventDefault()

    console.log('submit', pic, content, caption )
    fetch(process.env.REACT_APP_SERVER_URL + 'posts/edit' + props.post, {
        method: 'PUT',
        body: JSON.stringify({
         pic,
         content,
         caption,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response =>{
        response.json()
        setIsSubmit(true)
        setPic('')
        setCaption('')
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

    console.log(props.post);

  return (

    <div>
    // <p>Editing the post {props.currentPost}</p>

      <form onSubmit={handleUpdate}>
        <div>
          <h3>Picture Link:</h3>
          <button onClick={showUploadWidget}>Upload pics</button>
        </div>
        <div>

          <ReactBootStrap.InputGroup>
             <ReactBootStrap.InputGroup.Prepend>
                <ReactBootStrap.InputGroup.Text>Content</ReactBootStrap.InputGroup.Text>
                </ReactBootStrap.InputGroup.Prepend>
            <ReactBootStrap.FormControl as="textarea" aria-label="With textarea" name="content" onChange={e => setContent(e.target.value)}/>
          </ReactBootStrap.InputGroup>
        </div>
        <div>
          <h3>Caption:</h3>
          <input name="caption" placeholder="caption goes here" onChange={e => setCaption(e.target.value)} required/>
        </div>
        <br />
        <button type="submit">Update Post!</button>
      </form>
    </div>

  )
}
export default Edit

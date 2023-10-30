import './CreateImage.css'

import { useEffect, useState } from "react"
import { SERVER } from "../../Patrials/Config"
import axios from 'axios'

const CreateImage = ({ onCreatePhotoHandler }) => {

  // const [galery, setGalery] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [alt, setAlt] = useState('')



  const photoUrlHandler = event => setPhotoUrl(event.target.value)
  const altHandler = event => setAlt(event.target.value)



  // useEffect(() => {
  //   const getGalery = async () => {
  //     const { data } = await axios(`${SERVER}/galery`)
  //     setGalery(data)
  //   }
  //   getGalery()
  // }, [])


  const createPhotoFormHandler = async (event) => {
    event.preventDefault()


    const newPhoto = {
      photoUrl,
      alt
    }
    onCreatePhotoHandler(newPhoto)
    setPhotoUrl('')
    setAlt('')
    }




  return (
    <div className="photo-form-wrapper">
      <h2 className="photo-form-title">Add some photos</h2>
      <form className="create-photo-form" onSubmit={createPhotoFormHandler}>
        <div className="form-control">
          <label className="photo-label-element" htmlFor="photo-url">Enter photo url</label>
          <input
            // required
            type="text"
            id="photo-url"
            name="photo-url"
            onChange={photoUrlHandler}
            value={photoUrl}
          />
        </div>

        <div className="form-control">
          <label className="photo-label-element" htmlFor="photo-alt">
            What is shown in the picture</label>
          <input
            // required
            type="text"
            id="photo-alt"
            name="photo-alt"
            onChange={altHandler}
            value={alt}
          />
        </div>

        <button className="create-photo-button" type="submit">Add a photo</button>
      </form>
    </div>
  )
}

export default CreateImage

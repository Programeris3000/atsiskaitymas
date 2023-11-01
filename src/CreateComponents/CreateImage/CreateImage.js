import './CreateImage.css'

import { useState } from "react"

const CreateImage = ({ onCreatePhotoHandler }) => {

  const [photoUrl, setPhotoUrl] = useState('')
  const [alt, setAlt] = useState('')



  const photoUrlHandler = event => setPhotoUrl(event.target.value)
  const altHandler = event => setAlt(event.target.value)


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

        <button className="button-1" type="submit">Add a photo</button>
      </form>
    </div>
  )
}

export default CreateImage

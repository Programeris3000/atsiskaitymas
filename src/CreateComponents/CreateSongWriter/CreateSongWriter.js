import './CreateSongWriter.css'

import { useState } from "react"


const CreateSongWriter = ({ onCreateSongWriterHandler }) => {


  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [activityYears, setActivityYears] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [biography, setBiography] = useState('')



  const nameHandler = event => setName(event.target.value)
  const ageHandler = event => setAge(event.target.value)
  const activityYearsHandler = event => setActivityYears(event.target.value)
  const photoUrlHandler = event => setPhotoUrl(event.target.value)
  const biographyHandler = event => setBiography(event.target.value)


  const createSongwriterFormHandler = async (event) => {
    event.preventDefault()

    const newSongWriter = {
      name,
      age,
      activityYears,
      photoUrl,
      biography
    }
    onCreateSongWriterHandler(newSongWriter)

    setName('')
    setAge('')
    setActivityYears('')
    setPhotoUrl('')
    setBiography('')
    }

  return (
    <div className="songwriter-form-wrapper">
      <h2 className="songwriter-form-title">Create songwriter</h2>
      <form className="create-songwriter-form" onSubmit={createSongwriterFormHandler}>

        <div className="form-control">
          <label className="songwriter-label-element" htmlFor="songwriter-name">Enter songwriter name</label>
          <input
            required
            type="text"
            id="songwriter-name"
            name="songwriter-name"
            onChange={nameHandler}
            value={name}
          />
        </div>

        <div className="form-control">
          <label className="songwriter-label-element" htmlFor="songwriter-biography">Enter biography</label>
          <textarea
            required
            type="text"
            id="songwriter-biography"
            name="songwriter-biography"
            onChange={biographyHandler}
            value={biography}
          />
        </div>

        <div className="form-control">
          <label className="songwriter-label-element" htmlFor="songwriter-age">Enter songwriter age</label>
          <input
            required
            type="number"
            id="songwriter-age"
            min="10"
            max="110"
            name="songwriter-age"
            onChange={ageHandler}
            value={age}
          />
        </div>

        <div className="form-control">
          <label className="songwriter-label-element" htmlFor="songwriter-activity">Enter songwriter activity years</label>
          <input
            required
            type="text"
            id="songwriter-activity"
            name="songwriter-activity"
            onChange={activityYearsHandler}
            value={activityYears}
          />
        </div>

           <div className="form-control">
          <label className="songwriter-label-element" htmlFor="songwriter-photo-url">Enter songwriter photo url</label>
          <input
            required
            type="text"
            id="songwriter-photo-url"
            name="songwriter-photo-url"
            onChange={photoUrlHandler}
            value={photoUrl}
          />
        </div>


        <button className="button-1" type="submit">Create songwriter</button>
      </form>
    </div>
  )
}

export default CreateSongWriter

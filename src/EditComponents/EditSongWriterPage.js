import { SERVER } from '../Components/Patrials/Config'
import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'



const EditSongWriterPage = () => {

  const {ID} = useParams()
  const navigation = useNavigate()



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


  useEffect(()=>{
    const getSongwriter = async ()=>{
      const {data} = await axios(`${SERVER}/songwriters/${ID}`)
      const {  name, age, activityYears, photoUrl, biography } = data
      setName(name)
      setAge(age)
      setActivityYears(activityYears)
      setPhotoUrl(photoUrl)
      setBiography(biography)
    }
    getSongwriter()
  },[ID])


  const editSongwriterFormHandler = async (event) => {
    event.preventDefault()

    const editedSongWriter = {
      name,
      age,
      activityYears,
      photoUrl,
      biography
    }

    const res = await axios.put(`${SERVER}/songwriters/${ID}`, editedSongWriter)
    if(res.status === 200){
      toast.success('Songwriter successfully edited')
      navigation('/project/songwriterslist')
    }  else {
      toast.error('Something went wrong, songwriter was not deleted...')
    }

    setName('')
    setAge('')
    setActivityYears('')
    setPhotoUrl('')
    setBiography('')
    }



    
    return (
      <div className="songwriter-form-wrapper">
        <Link className="button-1" to={'/project/songwriterslist'}>Get back to songwriters</Link>
      <h2 className="songwriter-form-title">Edit songwriter</h2>
      <form className="create-songwriter-form" onSubmit={editSongwriterFormHandler}>

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
            min="10"
            max="110"
            id="songwriter-age"
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


        <button className="button-2" type="submit">Edit songwriter</button>
      </form>
    </div>
  )
}

export default EditSongWriterPage

import { SERVER } from '../Components/Patrials/Config'
import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './EditAwardsPage.css'



const EditStudioAward = () => {

  const {ID} = useParams()
  const navigation = useNavigate()

  const [awardTitle, setAwardTitle] = useState('')
  const [awardDescription, setAwardDescription] = useState('')
  const [awardPhoto, setAwardPhoto] = useState('')
  const [companyLogo, setCompanyLogo] = useState('')
  const [companyName, setCompanyName] = useState('')


  const awardTitleHandler = event => setAwardTitle(event.target.value)
  const awardDescriptionHandler = event => setAwardDescription(event.target.value)
  const awardPhotoHandler = event => setAwardPhoto(event.target.value)
  const companyLogoHandler = event => setCompanyLogo(event.target.value)
  const companyNameHandler = event => setCompanyName(event.target.value)


  useEffect(()=>{
    const getAwards = async ()=>{
      const {data} = await axios(`${SERVER}/studioAwards/${ID}`)
      const {awardTitle, awardDescription, awardPhoto, companyLogo, companyName} = data
      setAwardTitle(awardTitle)
      setAwardDescription(awardDescription)
      setAwardPhoto(awardPhoto)
      setCompanyLogo(companyLogo)
      setCompanyName(companyName)
    }
    getAwards()
  },[ID])


  const createAwardFormHandler = async (event) => {
    event.preventDefault()

    const editedAward = {
      awardTitle,
      awardDescription,
      awardPhoto,
      companyLogo,
      companyName
    }

    const res = await axios.put(`${SERVER}/studioAwards/${ID}`, editedAward)
    if(res.status === 200){
      toast.success('Award successfully edited')
      navigation('/')
    }  else {
      toast.error('Something went wrong, Award was not deleted...')
    }



    setAwardTitle('')
    setAwardDescription('')
    setAwardPhoto('')
    setCompanyLogo('')
    setCompanyName('')
    }




  return (
    <div className="award-form-wrapper">
      <h2 className="award-form-title">Edit award</h2>
      <Link className="button-1" to={'/'}>Get back to home page</Link>
      <form className="create-award-form" onSubmit={createAwardFormHandler}>

        <div className="form-control">
          <label className="award-label-element" htmlFor="award-title">Enter award title</label>
          <input
            required
            type="text"
            id="award-title"
            name="award-title"
            onChange={awardTitleHandler}
            value={awardTitle}
          />
        </div>

        <div className="form-control">
          <label className="award-label-element" htmlFor="award-description">Enter Description</label>
          <textarea
            required
            type="text"
            id="award-description"
            name="award-description"
            onChange={awardDescriptionHandler}
            value={awardDescription}
          />
        </div>

        <div className="form-control">
          <label className="award-label-element" htmlFor="award-photo">Enter photo url</label>
          <input
            required
            type="text"
            id="award-photo"
            name="award-photo"
            onChange={awardPhotoHandler}
            value={awardPhoto}
          />
        </div>

        <div className="form-control">
          <label className="award-label-element" htmlFor="company-logo">Enter company who gave award logo</label>
          <input
            required
            type="text"
            id="company-logo"
            name="company-logo"
            onChange={companyLogoHandler}
            value={companyLogo}
          />
        </div>

           <div className="form-control">
          <label className="award-label-element" htmlFor="company-name">Enter company who gave award name</label>
          <input
            required
            type="text"
            id="company-name"
            name="company-name"
            onChange={companyNameHandler}
            value={companyName}
          />
        </div>


        <button className="button-1" type="submit">Edit award</button>
      </form>
    </div>
  )
}

export default EditStudioAward

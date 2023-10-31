import './CreateStudioAward.css'

import { useState } from "react"


const CreateStudioAward = ({ onCreateAwardHandler }) => {

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


  const createAwardFormHandler = async (event) => {
    event.preventDefault()

    const newAward = {
      awardTitle,
      awardDescription,
      awardPhoto,
      companyLogo,
      companyName
    }
    onCreateAwardHandler(newAward)

    setAwardTitle('')
    setAwardDescription('')
    setAwardPhoto('')
    setCompanyLogo('')
    setCompanyName('')
    }




  return (
    <div className="award-form-wrapper">
      <h2 className="award-form-title">Create award</h2>
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
          <label className="award-label-element" htmlFor="award-description">Enter description</label>
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
          <label className="award-label-element" htmlFor="award-photo">Enter award photo url</label>
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


        <button className="button-2" type="submit">Create award</button>
      </form>
    </div>
  )
}

export default CreateStudioAward

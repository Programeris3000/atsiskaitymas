import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../Patrials/Config'
import { TailSpin } from 'react-loader-spinner'
import './MainPage.css'
import SongWritersList from '../SongWritersPage/SongWritersList'
import CreateStudioAward from '../CreateComponents/CreateStudioAward/CreateStudioAward'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const MainPage = () => {
  const [awards, setAwards] = useState('')

  useEffect(() => {
    const getAwards = async () => {
      const { data } = await axios(`${SERVER}/studioAwards`)
      setAwards(data)
    }
    getAwards()
  }, [])


  
const createAwardHandler = async award => {
  const res = await axios.post(`${SERVER}/studioAwards`, award)
      console.log(award)
      if (res.statusText === 'Created') {
        toast.success('Award successfully created')
        setAwards(prevState => [res.data,...prevState])
      } else {
        toast.error('Something went wrong')
      }
}


const deleteAwardHandler = awardId => {
  axios.delete(`${SERVER}/studioAwards/${awardId}`)
    .then((res) => {
      setAwards(prevState => {
        let updatedAward = { ...prevState };
        updatedAward = prevState.filter(award => award.id !== awardId)
        return updatedAward
      })

      if (res.statusText === 'OK') {
        toast.success('Award successfully deleted')
      } else {
        toast.error('Something went wrong, Award was not deleted...')
      }
    })
}



  const displayAwards = awards && awards.length > 0 ? (awards.map((data, index) => {
    const { awardTitle, awardDescription, awardPhoto, companyLogo, companyName, id } = data
    return (
      <div key={index} className="award-element-wrapper">

        <div className="buttons-wrapper">
          <button className="button-1" onClick={()=>deleteAwardHandler(id)}>Delete award</button>
          <Link className="button-1" to={`/project/${id}/editalbumpage`}>Edit Award</Link>
        </div>

        <h2 className="award-title">{awardTitle}</h2>
        <div className="award-image-content-wrapper">
          {awardPhoto && <img className="award-image" src={awardPhoto} alt={companyName} />}
        </div>

        <div className="award-logo-content-wrapper">
          {companyLogo && <img className="award-logo" src={companyLogo} alt={companyName} />}
          <h3 className="award-image-title">{companyName}</h3>
        </div>

        <p className="award-description">{awardDescription}</p>

      </div>
    )
  })) : (<TailSpin
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />)

  let awardsListWrapper = awards && awards.length > 0 ?(
  <div className="awards-wrapper">
    <h2 className="studio-awards-title">Our studio awards</h2>
    {displayAwards}

  </div>): ('')


  return (

    <div className="main-page-wrapper">
      <header className="main-page-header">
        <h1 className="main-page-studio-title">Sony Vibe Studios</h1>
        <span className="main-page-studio-subtitle">Where Every Note Finds Perfection</span>
        <p className="main-page-studio-description">Sony Vibe studios a world of creativity and excellence at our award-winning studio. With a rich history of accolades and honors, our team of talented artists and professionals consistently push the boundaries of innovation. Step into a space where artistry and achievement collide, and let us inspire your next project with our unmatched expertise and distinguished recognition.</p>
      </header>
      <main className="main-content-wrapper">

        {/* <div className="song-writers-wrapper">
          <h2 className="song-writers-list-title">Check out our Songwriters!</h2>
        </div> */}

        {awardsListWrapper}
        <CreateStudioAward onCreateAwardHandler={createAwardHandler}/>
      </main>

    </div>

  )
}

export default MainPage
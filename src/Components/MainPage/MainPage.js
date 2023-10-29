import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../Patrials/Config'
import { TailSpin } from 'react-loader-spinner'
import './MainPage.css'
import SongWritersList from '../SongWritersPage/SongWritersList'

const MainPage = () => {
  const [awards, setAwards] = useState('')

  useEffect(() => {
    const getAwards = async () => {
      const { data } = await axios(`${SERVER}/studioAwards`)
      setAwards(data)
    }
    getAwards()
  }, [])

  const displayAwards = awards && awards.length > 0 ? (awards.map((data, index) => {
    const { awardTitle, awardDescription, awardPhoto, companyLogo, companyName } = data
    return (
      <div className="award-element-wrapper">

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
      </header>
      <main className="main-content-wrapper">

        {/* <div className="song-writers-wrapper">
          <h2 className="song-writers-list-title">Check out our Songwriters!</h2>
        </div> */}

        {awardsListWrapper}

      </main>

    </div>

  )
}

export default MainPage
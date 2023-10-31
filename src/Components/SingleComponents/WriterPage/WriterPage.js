import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import { useParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import './WriterPage.css'

const WriterPage = () => {
  const [userData, setUserData] = useState('')
  console.log(userData)
  const { albums, songs, name, biography, activityYears, born, childrens, parents, age, photoUrl } = userData
  const { ID } = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    const getSongWriter = async () => {
      const { data } = await axios(`${SERVER}/songwriters/${ID}?_embed=albums&_embed=songs`)
      setUserData(data)
    }
    getSongWriter()
  }, [ID])

  let createdAmount = albums && albums.length > 0 ? (
    <div className="created-amount-wrapper">

      <h3 className="length-title">Created albums</h3>
      <span className="albums-length">{albums.length}</span>

      <h3 className="length-title">Created Songs</h3>
      {songs && songs.length > 0 ? <span className="songs-length">{songs.length}</span> : ''}

    </div>
  ) : ''


  const backButtonHandler = () => {
    navigation(`/project/songwriterslist`)
  }












  //Childrens
//   let childrensElement = <p>{name} Don't have childrens</p>

//   if (childrens && childrens.length >= 2) {
//     childrensElement = childrens.map((child, index) => {
//       return (
//           <li key={index}>{child}</li>
//       )
//     })
//   } else if (childrens.length === 1) {
//     childrensElement = childrens.map((child) => {
//       return (
//         <span>{child}</span>
//       )
//     })
//   }
// let childrensChecker = childrens && childrens.length >= 2 ? <ul>{childrensElement}</ul> : childrensElement






  //Parents
  // let parentsElement = ''

  // if(parents && parents.length > 0){
  //   parentsElement = parents.map((parent, index)=>{
  //     return(
  //       <li key={index}>{parent}</li>
  //     )
  //   })
  // }

  // const parentsChecker = parents.length > 0 ? (
  //   <div className="parrents-wrapper">
  //     <h3>Parrents: </h3>
  //     <ul>{parentsElement}</ul>
  //   </div>) : null


 {/* <span>Age {age}</span>
            <span>Born date {born}</span> */}

            {/* <div className="childrens-wrapper">
              <h3>{name} childrens: </h3>
              {childrensChecker}
            </div> */}

            {/* {parentsChecker} */}




  return (
    <>
      {userData ? (
        <div className="song-writer-page-wrapper">
          <button className="button-1" onClick={backButtonHandler}>Get back to Song writers...</button>
          <h1 className="song-writer-name">{name}</h1>
          <img className="song-writer-photo" src={photoUrl} alt={name}/>
          <h2 className="singer-activity-years-title">Activity years</h2>
          <span className="singer-activity-years">{activityYears}</span>
          <p className="singer-biography">{biography}</p>


          {createdAmount}

        </div>
      ) :
        (<TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />)}

    </>

  )
}

export default WriterPage
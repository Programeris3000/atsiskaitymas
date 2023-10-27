import { useEffect, useState } from 'react'
import './WriterPage.css'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import { useParams } from 'react-router-dom'
import Card from '../../Card/Card'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

const WriterPage = () => {
  const [userData, setUserData] = useState('')
  console.log(userData)
  const {albums, songs, name, biography, activityYears} = userData
  const {ID} = useParams()
  const navigation = useNavigate()

  useEffect(()=>{
    const getSongWriter = async () => {
      const {data} = await axios(`${SERVER}/songwriters/${ID}?_embed=albums&_embed=songs`)
      setUserData(data)
    }
    getSongWriter()
  },[ID])

  const backButtonHandler = ()=>{
    navigation(`/project/songwriterslist`)
  }


  return (
    <Card>
      {userData ? (
        <>
          <button onClick={backButtonHandler}>Get back to Song writers...</button>
          <h1>{name}</h1>
          <span>{activityYears}</span>
          <p>{biography}</p>
        </>
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
    </Card>
  )
}

export default WriterPage
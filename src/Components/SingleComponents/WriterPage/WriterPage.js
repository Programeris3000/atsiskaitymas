import { useEffect, useState } from 'react'
import './WriterPage.css'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import { useParams } from 'react-router-dom'
import Card from '../../Card/Card'
import { TailSpin } from 'react-loader-spinner'

const WriterPage = () => {
  const [userData, setUserData] = useState('')
  console.log(userData)
  const {albums, songs, name} = userData
  const {ID} = useParams()

  useEffect(()=>{
    const getSongWriter = async () => {
      const {data} = await axios(`${SERVER}/songwriters/${ID}?_embed=albums&_embed=songs`)
      setUserData(data)
    }
    getSongWriter()
  },[ID])


  return (
    <Card>
      {userData ? (
        <>
          <h1>{name}</h1>
          <span>Created albums: {albums.length}</span>
          <span>Created songs: {songs.length}</span>
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
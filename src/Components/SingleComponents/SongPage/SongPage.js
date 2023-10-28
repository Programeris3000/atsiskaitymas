import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './SongPage.css'
import { SERVER } from '../../Patrials/Config'
import Card from '../../Card/Card'
import { TailSpin } from 'react-loader-spinner'

const SongPage = () => {
  const [song, setSong] = useState('')
  const {ID} = useParams()
  const {album, duration, lyrics, musicStyle, songThumbnail, songTitle, songwriter} = song
console.log(song)
  useEffect(()=>{
    const getSong = async () => {
      const {data} = await axios(`${SERVER}/songs/${ID}?_expand=album&_expand=songwriter`)
      setSong(data)
    }
    getSong()
  },[ID])


  return (
    <Card>
      {song ? (
        <>
        <Link to='/project/songslist'>Get back to song list</Link>
        <h2>{songTitle}</h2>
        <p>Song created by {songwriter && songwriter.name}</p>
        <p>From album: {album && album.title}</p>
        <p>Duration: {duration}</p>
        <p>Part of lyrics : {lyrics}</p>
        <p>Music style: {musicStyle}</p>
        <img style={{width: '300px'}} src={songThumbnail} alt={songTitle}/>
        </>
      ): 
      
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

export default SongPage
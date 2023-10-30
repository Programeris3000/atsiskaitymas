import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import { TailSpin } from 'react-loader-spinner'
import './SongPage.css'
import ReactPlayer from 'react-player/lazy'

const SongPage = () => {
  const [song, setSong] = useState('')
  const {ID} = useParams()
  const {album, release, lyrics, musicStyle, songThumbnail, songTitle, songwriter, youtubeUrl} = song
  useEffect(()=>{
    const getSong = async () => {
      const {data} = await axios(`${SERVER}/songs/${ID}?_expand=album&_expand=songwriter`)
      setSong(data)
    }
    getSong()
  },[ID])


  return (
    <>
      {song ? (
        <>
        <Link className="button-1" to='/project/songslist'>Get back to song list</Link>
          <h2 className="song-title">{songTitle}</h2>
        <div className="single-song-wrapper">

          <div className="song-creator-name-display-wrapper">
          <h3 className="song-creator-title">Songwriter</h3>
          <span className="song-creator-name">{songwriter && songwriter.name}</span>
          </div>
          
          <div className="album-content-wrapper">
           <h4 className="album-title">Album</h4>
           <span className="album-name">{album && album.title}</span>
          <span className="realease-date">Released {release}</span>
          </div>
          <ReactPlayer url={youtubeUrl} />


          <div className="bottom-content-wrapper">
            <p className="part-of-lyrics">{lyrics}</p>
            <img className="song-cover-image" style={{width: '300px'}} src={songThumbnail} alt={songTitle}/>
            <span className="music-style">Music style: {musicStyle}</span>
          </div>
        </div>
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
        </>
  )
}

export default SongPage
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import { TailSpin } from 'react-loader-spinner'
import './SongPage.css'
import React from 'react'
import ReactPlayer from 'react-player/youtube'

const SongPage = () => {
  const [song, setSong] = useState('')
  const {ID} = useParams()
  const {album, release, lyrics, musicStyle, songThumbnail, songTitle, songwriter, youtubeUrl} = song
  console.log(youtubeUrl)
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
          <span className="realease-date">{release}</span>
          </div>


          <div className="bottom-content-wrapper">
            <h4 className="music-style-title">Music style</h4>
            <span className="music-style">{musicStyle}</span>
            <ReactPlayer width="100%" className="youtube-player" url={youtubeUrl} />
            <h4 className="lyrics-title">Lyrics</h4>
            <p className="part-of-lyrics">{lyrics}</p>
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
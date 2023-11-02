import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './AlbumPage.css'
import { SERVER } from '../../Patrials/Config'
import { TailSpin } from 'react-loader-spinner'

const AlbumPage = () => {

  const [album, setAlbum] = useState({
    description: '',
    genre: '',
    id: '',
    photoUrl: '',
    releaseDate: '',
    title: '',
    songwriterId: ''
  });
  const [songWriter, setSongWriter] = useState({
    activityYears: '',
    age: '',
    biography: '',
    born: '',
    name: '',
    songs: ''
  });

  const {description, genre ,photoUrl, releaseDate, title, songwriterId, songs} = album
  const { name} = songWriter


  const {ID} = useParams()


    useEffect(()=>{
      const getAlbum = async () => {
        const {data} = await axios(`${SERVER}/albums/${ID}?_embed=songs`)
        setAlbum(data)
      }
      getAlbum()
    },[ID])

    useEffect(()=>{
      const getSongWriter = async () => {
        const {data} = await axios(`${SERVER}/songwriters/${songwriterId}`)
        setSongWriter(data)
      }
      getSongWriter()
    },[songwriterId])
    

    const songsCheck = songs && songs.length > 0 ? (
    <div className="songs-amount-content-wrapper">
       <h5 className="songs-in-album-title">Songs in album</h5>
       <span className="songs-length">{songs.length}</span>
    </div>) : ('')

  return (
    <>
      {album ? (
        <div className="album-page-wrapper">
          <Link className="button-1" to='/project/albumslist'>Get back to albums...</Link>

          <div className="single-album-item">
            <h1 className="album-title">{title}</h1>
            <h2 className="album-creator-name">{name} </h2>
            <h3 className="album-genre-title">Genre</h3>
            <span className="album-genre">{genre}</span>
            <h4 className="album-description-title">Description</h4>
            <p className="album-description">{description}</p>
            {songsCheck}
            <span className="album-release-date">Released: {releaseDate}</span>
            <img className="album-image" src={photoUrl} alt={title}/>
          </div>
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

export default AlbumPage
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './AlbumPage.css'
import { SERVER } from '../../Patrials/Config'
import { TailSpin } from 'react-loader-spinner'

const AlbumPage = () => {
  // const [album, setAlbum] = useState('')
  // const [songWriter, setSongWriter] = useState('')
  const [album, setAlbum] = useState({
    description: '',
    genre: '',
    id: '',
    photoUrl: '',
    releaseDate: '',
    title: '',
    songwriterId: ''
  });
  console.log(album)
  const [songWriter, setSongWriter] = useState({
    activityYears: '',
    age: '',
    biography: '',
    born: '',
    name: '',
    songs: ''
  });

  const {description, genre, id ,photoUrl, realeaseDate, title, songwriterId, songs} = album
  const {activityYears, age, biography, born, name} = songWriter
  // const {activityYears, age, biography, born, name} = album.songwriter


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
       <h4 className="songs-in-album-title">Songs in album</h4>
       <span className="songs-length">{songs.length}</span>
    </div>) : ('')

  return (
    <>
      {album ? (
        <>
        <Link className="button-1" to='/project/albumslist'>Get back to albums...</Link>

        <div className="single-album-item">
          <h2 className="album-title">{title}</h2>
          <h3 className="album-creator-name">{name} </h3>
          <span className="album-genre">Genre {genre}</span>
          <p className="album-description">{description}</p>
          {songsCheck}
          <span className="album-release-date">Release date: {realeaseDate}</span>
          <img style={{width: '300px'}} src={photoUrl} alt={title}/>
        </div>
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
        </>
  )
}

export default AlbumPage
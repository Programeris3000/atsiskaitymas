import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './AlbumPage.css'
import { SERVER } from '../../Patrials/Config'
import Card from '../../Card/Card'
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
    

    const songsCheck = songs && songs.length

  return (
    <Card>
      {album ? (
        <>
        <Link to='/project/albumslist'>Get back to albums...</Link>
        <h2>{title}</h2>
        <p>Album created by {name}. Genre :{genre} </p>
        <p>{description}</p>
        <p>{songsCheck} songs in album</p>
        <p>Realease date: {realeaseDate}</p>
        <img style={{width: '300px'}} src={photoUrl} alt={title}/>
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

export default AlbumPage
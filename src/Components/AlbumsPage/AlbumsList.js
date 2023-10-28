import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../Patrials/Config'
import AlbumItem from '../SingleComponents/AlbumItem/AlbumItem'
import './AlbumList.css'
import { Link } from 'react-router-dom'


const AlbumsList = () => {
  const [albums, setAlbums] = useState('')
  console.log(albums)

  useEffect(()=>{
    const getAlbums = async () =>{
      const {data} = await axios(`${SERVER}/albums?_expand=songwriter`)
      setAlbums(data)
    }
    getAlbums()
  },[])

  

  const splitAlbums = albums && albums.map((album, index)=>{
    return(
      <AlbumItem data={album} key={index}/>
    )
  })

  return (
    <>
    <h1 className="albums-page-title">Albums Page</h1>
    <Link to='/project/albumslist/createalbumpage'>Create Album</Link>
    <div className="albums-page-wrapper">{splitAlbums}</div>
    </>
  )
}

export default AlbumsList
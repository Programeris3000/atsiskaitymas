import { useEffect, useState } from 'react'
import axios from 'axios'
import './AlbumsList.css'
import { SERVER } from '../Patrials/Config'
import AlbumItem from '../SingleComponents/AlbumItem/AlbumItem'


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
    <h1>Albums Page</h1>
    <div>{splitAlbums}</div>
    </>
  )
}

export default AlbumsList
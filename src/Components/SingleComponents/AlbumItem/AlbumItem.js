import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import Card from '../../Card/Card'
import './AlbumItem.css'
import { Link } from 'react-router-dom'


const AlbumItem = ({data, key, onDeleteAlbumHandler, editAlbumHandler}) => {

  const {title, id, songwriterId, photoUrl} = data
  const [songWriter, setSongWriter] = useState('')
  
  const idForDeleteHandler = () => {
    onDeleteAlbumHandler(id)
  }


  
  useEffect(()=>{
    const getSongWriter = async () => {
      const {data} = await axios (`${SERVER}/songwriters/${songwriterId}`)
      setSongWriter(data)
    }
    getSongWriter()
  },[])



  return (
    <>
    {data ? (
      <Card key={key}>
        <button onClick={idForDeleteHandler}>Delete Album</button>
        <Link to={`/project/albumslist/${id}/editalbumpage`}>Edit Album</Link>
        <Link to={`/project/albumslist/${id}`}>
        <h2>{title}</h2>
        <span>Created by {songWriter.name}</span>
        <img className="album-item-image" src={photoUrl} alt={title}/>
        </Link>
      </Card>
    ) : (
      <p>loading...</p>
    )}
    </>
  )
}

export default AlbumItem
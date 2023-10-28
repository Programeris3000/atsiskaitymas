import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import Card from '../../Card/Card'
import './AlbumItem.css'
import { Link } from 'react-router-dom'


const AlbumItem = ({data}, {key}) => {
  const {title, id, songwriterId, photoUrl, songwriter} = data
  const {name} = songwriter
  
  const deleteAlbumHandler = () => {
    axios.delete(`${SERVER}/albums/${id}`)
    console.log(id)
  }
  

  return (
    <>
    {data ? (
      <Card key={key}>
        <button onClick={deleteAlbumHandler}>Delete Album</button>
        <Link to={`/project/albumslist/${id}`}>
        <h2>{title}{songwriterId}</h2>
        <span>Created by {name}</span>
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
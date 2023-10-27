import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import Card from '../../Card/Card'
import './AlbumItem.css'

const AlbumItem = ({data}, {key}) => {
  const {title, id, songwriterId, photoUrl, songwriter} = data
  const {name} = songwriter
  

  return (
    <>
    {data ? (
      <Card>
        <h2>{title}{songwriterId}</h2>
        <span>Created by {name}</span>
        <img style = {{ width: '300px'}} src={photoUrl} alt={title}/>
      </Card>
    ) : (
      <p>loading...</p>
    )}
    </>
  )
}

export default AlbumItem
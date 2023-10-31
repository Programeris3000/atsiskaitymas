import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../../Patrials/Config'
import Card from '../../Card/Card'
import './AlbumItem.css'
import { Link } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'


const AlbumItem = ({data, key, onDeleteAlbumHandler}) => {

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
      <div className="album-element-wrapper" key={key}>
        <Link className="album-link-wrapper" to={`/project/albumslist/${id}`}>
        <h2 className="album-title">{title}</h2>
        <span className="album-creator-name">Created by {songWriter.name}</span>
        <img className="album-cover-image" src={photoUrl} alt={title}/>
        </Link>

        <div className="buttons-wrapper">
          <button className="button-1" onClick={idForDeleteHandler}>Delete Album</button>
          <Link className="button-1" to={`/project/albumslist/${id}/editalbumpage`}>Edit Album</Link>
        </div>

      </div>
    ) : (
      <TailSpin
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
    )}
    </>
  )
}

export default AlbumItem
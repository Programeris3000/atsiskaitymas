import './CreateAlbum.css'

import { useEffect, useState } from "react"
import { SERVER } from "../../Components/Patrials/Config"
import axios from 'axios'

const CreateAlbumPage = ({ onCreateAlbumHandler }) => {

  const [musicStyles, setMusicStyles] = useState('')


  const [albumTitle, setAlbumTitle] = useState('')
  const [albumCover, setAlbumCover] = useState('')
  const [albumRealease, setAlbumRealease] = useState('')
  const [albumGenre, setAlbumGenre] = useState('')
  const [albumDescription, setAlbumDescription] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  
  const [songWriters, setSongWriters] = useState('')


  const albumTitleHandler = event => setAlbumTitle(event.target.value)
  const albumCoverHandler = event => setAlbumCover(event.target.value)
  const albumRealeaseHandler = event => setAlbumRealease(event.target.value)
  const albumGenreHandler = event => setAlbumGenre(event.target.value)
  const albumDescriptionHandler = event => setAlbumDescription(event.target.value)
  const albumUserHandler = event => setSelectedUser(event.target.value)


  useEffect(()=>{
    const getMusicStyles = async ()=>{
      const {data} = await axios(`${SERVER}/musicStyles`)
      setMusicStyles(data)
    }
    getMusicStyles()
  },[])


  useEffect(() => {
    const getSongWriters = async () => {
      const { data } = await axios(`${SERVER}/songwriters`)
      setSongWriters(data)
      setSelectedUser(data && data[0].id)
    }
    getSongWriters()
  }, [])


  const optionElements = songWriters && songWriters.length > 0 && songWriters.map((writer, index) => {
    return (
      <option className="create-album-option-element" key={index} value={writer.id}>{writer.name}</option>
    )
  })

  const styleOptionElements = musicStyles && musicStyles.length > 0 && musicStyles.map((genre, index) => {
    return (
      <option className="create-album-option-element" key={index} value={genre}>{genre}</option>
    )
  })



  const createAlbumFormHandler = async (event) => {
    event.preventDefault()

    console.log(albumTitle)
    console.log(albumCover)
    console.log(albumRealease)
    console.log(albumGenre)
    console.log(albumDescription)

    const newAlbum = {
      title: albumTitle,
      photoUrl: albumCover,
      releaseDate: Number(albumRealease),
      genre: albumGenre,
      description: albumDescription,
      songwriterId: Number(selectedUser)
    }
    onCreateAlbumHandler(newAlbum)
    setAlbumTitle('')
    setAlbumCover('')
    setAlbumRealease('')
    setAlbumGenre('')
    setAlbumDescription('')


  }




  return (
    <form className="create-album-form" onSubmit={createAlbumFormHandler}>
      <div className="form-control">
        <label className="create-album-label-element" htmlFor="create-album-title">Enter Album title</label>
        <input
          required
          type="text"
          id="create-album-title"
          name="create-album-title"
          onChange={albumTitleHandler}
          value={albumTitle}
        />
      </div>

      <div className="form-control">
        <label className="create-album-label-element" htmlFor="create-album-cover">Enter Cover Photo Url</label>
        <input
          required
          type="text"
          id="create-album-cover"
          name="create-album-cover"
          onChange={albumCoverHandler}
          value={albumCover}
        />
      </div>

      <div className="form-control">
        <label className="create-album-label-element" htmlFor="create-album-realease">Enter Album Realease date</label>
        <input
          required
          type="number"
          min="1950"
          max="2023"
          id="create-album-realease"
          name="create-album-realease"
          onChange={albumRealeaseHandler}
          value={albumRealease}
        />
      </div>

      <div className="select-element-wrapper">
        <label className="select-element-label" htmlFor="create-album-genre">Select album music style</label>
        <select id="create-album-genre" onChange={albumGenreHandler} value={albumGenre}>
          {styleOptionElements}
        </select>
      </div>

      <div className="create-album-textarea-wrapper">
        <label className="create-album-label-element" htmlFor="create-album-description">Enter Album description</label>
        <textarea
          required
          type="text"
          id="create-album-description"
          name="create-album-description"
          onChange={albumDescriptionHandler}
          value={albumDescription}
        />
      </div>

      <div className="select-element-wrapper">
        <label className="select-element-label" htmlFor="create-album-select-element">Select songwriter</label>
        <select id="create-album-select-element" onChange={albumUserHandler} value={selectedUser}>
          {optionElements}
        </select>
      </div>

      <input className="button-1" type="submit" value="Create album" />
    </form>
  )
}

export default CreateAlbumPage

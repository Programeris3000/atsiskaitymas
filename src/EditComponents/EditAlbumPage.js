import { useEffect, useState } from "react"
import { SERVER } from "../Components/Patrials/Config"
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import './EditAlbumPage.css'

const EditAlbumPage = () => {

  const { ID } = useParams()
  const navigation = useNavigate()

  const [albumTitle, setAlbumTitle] = useState('')
  const [albumCover, setAlbumCover] = useState('')
  const [albumRelease, setAlbumRelease] = useState('')
  const [albumGenre, setAlbumGenre] = useState('')
  const [albumDescription, setAlbumDescription] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [songWriters, setSongWriters] = useState('')


  const albumTitleHandler = event => setAlbumTitle(event.target.value)
  const albumCoverHandler = event => setAlbumCover(event.target.value)
  const albumReleaseHandler = event => setAlbumRelease(event.target.value)
  const albumGenreHandler = event => setAlbumGenre(event.target.value)
  const albumDescriptionHandler = event => setAlbumDescription(event.target.value)
  const albumUserHandler = event => setSelectedUser(event.target.value)


  useEffect(() => {
    const getSongWriters = async () => {
      const { data } = await axios(`${SERVER}/songwriters`)
      setSongWriters(data)
      // setSelectedUser(data[0].id)
    }
    getSongWriters()
  }, [])

  useEffect(() => {
    const getAlbumToEdit = async () => {
      const { data } = await axios(`${SERVER}/albums/${ID}`)
      console.log(data)
      const { title, songwriterId, releaseDate, photoUrl, genre, description } = data
      setAlbumTitle(title)
      setAlbumCover(photoUrl)
      setAlbumRelease(releaseDate)
      setAlbumGenre(genre)
      setAlbumDescription(description)
      setSelectedUser(songwriterId)
    }
    getAlbumToEdit()
  }, [ID])


  const optionElements = songWriters && songWriters.length > 0 && songWriters.map((writer, index) => {
    return (
      <option key={index} value={writer.id}>{writer.name}</option>
    )
  })



  const editAlbumFormHandler = async (event) => {
    event.preventDefault()

    console.log(albumTitle)
    console.log(albumCover)
    console.log(albumRelease)
    console.log(albumGenre)
    console.log(albumDescription)

    const editedAlbum = {
      id: Number(ID),
      title: albumTitle,
      photoUrl: albumCover,
      releaseDate: Number(albumRelease),
      genre: albumGenre,
      description: albumDescription,
      songwriterId: Number(selectedUser)
    }

    const res = await axios.put(`${SERVER}/albums/${ID}`, editedAlbum)
    if (res.status === 200) {
      toast.success('Album successfully edited')
      navigation('/project/albumslist')
    } else {
      toast.error('Something went wrong, Album was not deleted...')
    }

  }


  return (
    <div className="edit-form-content-wrapper">
      <Link className="button-1" to='/project/albumslist'>Back to albums</Link>
      <h1 className="album-form-title">Edit album</h1>

      <form className="edit-form-wrapper" onSubmit={editAlbumFormHandler}>
        <div className="form-control">
          <label htmlFor="create-album-title">Edit Album title</label>
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
          <label htmlFor="create-album-cover">Edit Cover Photo Url</label>
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
          <label htmlFor="create-album-release">Edit Album Release date</label>
          <input
            required
            type="number"
            min="1950"
            max="2023"
            id="create-album-release"
            name="create-album-release"
            onChange={albumReleaseHandler}
            value={albumRelease}
          />
        </div>

        <div className="form-control">
          <label htmlFor="create-album-genre">Edit Album genre</label>
          <input
            required
            type="text"
            id="create-album-genre"
            name="create-album-genre"
            onChange={albumGenreHandler}
            value={albumGenre}
          />
        </div>

        <div className="form-control">
          <label htmlFor="create-album-description">Edit Album description</label>
          <textarea
            required
            type="text"
            id="create-album-description"
            name="create-album-description"
            onChange={albumDescriptionHandler}
            value={albumDescription}
          />
        </div>

        <div className="form-control">
        <label htmlFor="create-album-select-element">Select songwriter</label>
          <select id="create-album-select-element" onChange={albumUserHandler} value={selectedUser}>
            {optionElements}
          </select>
        </div>

        <input className="button-1" type="submit" value="Edit album" />
      </form>
    </div>
  )
}

export default EditAlbumPage

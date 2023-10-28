// import './CreateAlbumPage.css'

import { useEffect, useState } from "react"
import { SERVER } from "../Patrials/Config"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateAlbumPage = () => {

  const [albumTitle, setAlbumTitle] = useState('')
  const [albumCover, setAlbumCover] = useState('')
  const [albumRealease, setAlbumRealease] = useState('')
  const [albumGenre, setAlbumGenre] = useState('')
  const [albumDescription, setAlbumDescription] = useState('')

  const [selectedUser, setSelectedUser] = useState('')

  const [songWriters, setSongWriters] = useState('')

  const navigate = useNavigate()

  const albumTitleHandler = event => setAlbumTitle(event.target.value)
  const albumCoverHandler = event => setAlbumCover(event.target.value)
  const albumRealeaseHandler = event => setAlbumRealease(event.target.value)
  const albumGenreHandler = event => setAlbumGenre(event.target.value)
  const albumDescriptionHandler = event => setAlbumDescription(event.target.value)

  const albumUserHandler = event => setSelectedUser(event.target.value)
  

  useEffect(()=>{
    const getSongWriters = async () => {
      const {data} = await axios(`${SERVER}/songwriters`)
      // console.log(data)
      setSongWriters(data)
      setSelectedUser(data[0].id)
    }
    getSongWriters()
  },[])


  const optionElements = songWriters && songWriters.length > 0 && songWriters.map((writer, index)=>{
    return (
      <option key={index} value={writer.id}>{writer.name}</option>
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
      realeaseDate: albumRealease,
      genre: albumGenre,
      description: albumDescription,
      songwriterId: Number(selectedUser)
    }
    console.log(newAlbum)

    const res = await axios.post(`${SERVER}/albums`,(newAlbum))
    console.log(res.statusText)
    if(res.statusText === 'Created'){
      toast.success('Album successfully created')
      navigate('/project/albumslist')
    } else {
      toast.error('Something went wrong')
    }

  }




  return (
    <form onSubmit={createAlbumFormHandler}>
      <div form-control>
      <label htmlFor="create-album-title">Enter Album title</label>
      <input 
      // required
      type="text" 
      id="create-album-title" 
      name="create-album-title" 
      onChange={albumTitleHandler}
      value={albumTitle}
      />
      </div>

      <div form-control>
      <label htmlFor="create-album-cover">Enter Cover Photo Url</label>
      <input 
      // required
      type="text" 
      id="create-album-cover" 
      name="create-album-cover" 
      onChange={albumCoverHandler}
      value={albumCover}
      />
      </div>

      <div form-control>
      <label htmlFor="create-album-realease">Enter Album Realease date</label>
      <input 
      // required
      type="text" 
      id="create-album-realease" 
      name="create-album-realease" 
      onChange={albumRealeaseHandler}
      value={albumRealease}
      />
      </div>

      <div form-control>
      <label htmlFor="create-album-genre">Enter Album genre</label>
      <input 
      // required
      type="text" 
      id="create-album-genre" 
      name="create-album-genre" 
      onChange={albumGenreHandler}
      value={albumGenre}
      />
      </div>

      <div form-control>
      <label htmlFor="create-album-description">Enter Album description</label>
      <textarea
      // required
      type="text" 
      id="create-album-description" 
      name="create-album-description" 
      onChange={albumDescriptionHandler}
      value={albumDescription}
      />
      </div>

      <div className="form-control">
      <select onChange={albumUserHandler} value={selectedUser}>
        {optionElements}
      </select>
    </div>
    
      <input type="submit" value="Create album"/>
    </form>
  )
}

export default CreateAlbumPage

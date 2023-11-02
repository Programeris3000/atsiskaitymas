import './CreateSongPage.css'

import { useEffect, useState } from "react"

import axios from 'axios'
import { SERVER } from '../../Components/Patrials/Config'

const CreateSongPage = ({ onCreateSongHandler }) => {

  const [musicStyles, setMusicStyles] = useState('')


  const [songTitle, setSongTitle] = useState('')
  const [musicStyle, setMusicStyle] = useState('')
  const [songRelease, setSongRelease] = useState('')
  const [songLyrics, setSongLyrics] = useState('')
  const [songThumbnail, setSongThumbnail] = useState('')
  const [songWriters, setSongWriters] = useState([])
  const [youtubeUrl, setYoutubeUrl] = useState('')


  const [songWriter, setSongWriter] = useState({})
  const [selectedAlbum, setSelectedAlbum] = useState('')

  const [selectedUser, setSelectedUser] = useState('')

  const songTitleHandler = event => setSongTitle(event.target.value)
  const musicStyleHandler = event => setMusicStyle(event.target.value)
  const songReleaseHandler = event => setSongRelease(event.target.value)
  const songLyricsHandler = event => setSongLyrics(event.target.value)
  const songThumbnailHandler = event => setSongThumbnail(event.target.value)
  const youtubeUrlHandler = event => setYoutubeUrl(event.target.value)

  const selectedAlbumHandler = event => setSelectedAlbum(event.target.value)
  const selectedUserHandler = event => setSelectedUser(event.target.value)


  useEffect(()=>{
    const getMusicStyles = async ()=>{
      const {data} = await axios(`${SERVER}/musicStyles`)
      setMusicStyles(data)
      setMusicStyle(data[0])
    }
    getMusicStyles()
  },[])

  useEffect(() => {
    const getSongWriters = async () => {
      const { data } = await axios(`${SERVER}/songwriters`)
      setSongWriters(data)
      setSelectedUser(data[0].id)
    }
    getSongWriters()
  }, [])

  useEffect(() => {
    const getSongWriter = async () => {
      const { data } = await axios(`${SERVER}/songwriters/${selectedUser}?_embed=albums`)
      setSongWriter(data)
      setSelectedAlbum(data.albums && data.albums[0].id)
    }
    getSongWriter()
  }, [selectedUser])


  const optionElements = songWriters && songWriters.length > 0 && songWriters.map((user, index) => {
    return (
      <option key={index} value={user.id}>{user.name}</option>
    )
  })

  const albumsOptionElements = songWriter.albums && songWriter.albums.length > 0 && songWriter.albums.map((album, index) => {
    return (
      <option key={index} value={album.id}>{album.title}</option>
    )
  })

  const styleOptionElements = musicStyles && musicStyles.length > 0 && musicStyles.map((genre, index) => {
    return (
      <option className="create-album-option-element" key={index} value={genre}>{genre}</option>
    )
  })



  const createSongFormHandler = async (event) => {
    event.preventDefault()

    const newSong = {
      albumId: Number(selectedAlbum),
      youtubeUrl: youtubeUrl,
      songwriterId: Number(selectedUser),
      songTitle: songTitle,
      musicStyle: musicStyle,
      release: Number(songRelease),
      lyrics: songLyrics,
      songThumbnail: songThumbnail
    }
    onCreateSongHandler(newSong)
    setSongTitle('')
    setSongRelease('')
    setSongLyrics('')
    setSongThumbnail('')
    setYoutubeUrl('')
  }


  return (
    <form onSubmit={createSongFormHandler}>
      <div className="form-control">
        <label className="label-element" htmlFor="create-song-title">Enter Song title</label>
        <input
          required
          type="text"
          id="create-song-title"
          name="create-song-title"
          onChange={songTitleHandler}
          value={songTitle}
        />
      </div>


      <div className="select-element-wrapper">
        <label className="select-element-label" htmlFor="create-album-genre">Select album music style</label>
        <select id="create-album-genre" onChange={musicStyleHandler} value={musicStyle}>
          {styleOptionElements}
        </select>
      </div>


      <div className="form-control">
        <label className="label-element" htmlFor="create-song-release">Enter song release date</label>
        <input
          required
          type="number"
          min="1950"
          max="2023"
          id="create-song-release"
          name="create-song-release"
          onChange={songReleaseHandler}
          value={songRelease}
        />
      </div>

      <div className="form-control">
        <label className="label-element" htmlFor="create-song-youtube-url">Enter youtube url of song</label>
        <input
          required
          type="text"
          id="create-song-youtube-url"
          name="create-song-youtube-url"
          onChange={youtubeUrlHandler}
          value={youtubeUrl}
        />
      </div>

      <div className="create-song-textarea-wrapper">
        <label className="label-element" htmlFor="create-song-lyrics">Enter song lyrics</label>
        <textarea
          required
          type="text"
          id="create-song-lyrics"
          name="create-song-lyrics"
          onChange={songLyricsHandler}
          value={songLyrics}
        />
      </div>

      <div className="form-control">
        <label className="label-element" htmlFor="create-song-thumbnail">Enter song thumbnail</label>
        <input
          required
          type="text"
          id="create-song-thumbnail"
          name="create-song-thumbnail"
          onChange={songThumbnailHandler}
          value={songThumbnail}
        />
      </div>

      <div className="select-element-wrapper">
        <label className="select-element-label" htmlFor="select-song-writter">Select song Author</label>
        <select id="select-song-writter" onChange={selectedUserHandler} value={selectedUser}>
          {optionElements}
        </select>
      </div>

      <div className="select-element-wrapper">
        <label className="select-element-label" htmlFor="select-album">Select album</label>
        <select id="select-album" onChange={selectedAlbumHandler} value={selectedAlbum}>
          {albumsOptionElements}
        </select>
      </div>

      <input className="button-1" type="submit" value="Create song" />
    </form>
  )
}

export default CreateSongPage

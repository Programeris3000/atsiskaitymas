import { useEffect, useState } from "react"
import axios from 'axios'
import { SERVER } from '../Components/Patrials/Config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import './EditSongPage.css'

const EditSongPage = () => {

  const {ID} = useParams()
  const navigation = useNavigate()

  const [musicStyles, setMusicStyles] = useState('')


  const [songTitle, setSongTitle] = useState('')
  const [musicStyle, setMusicStyle] = useState('')
  const [songRelease, setSongRelease] = useState('')
  const [songLyrics, setSongLyrics] = useState('')
  const [songThumbnail, setSongThumbnail] = useState('')
  const [songWriters, setSongWriters] = useState('')
  const [songWriter, setSongWriter] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  

  const songTitleHandler = event => setSongTitle(event.target.value)
  const musicStyleHandler = event => setMusicStyle(event.target.value)
  const songReleaseHandler = event => setSongRelease(event.target.value)
  const songLyricsHandler = event => setSongLyrics(event.target.value)
  const songThumbnailHandler = event => setSongThumbnail(event.target.value)
  const selectedAlbumHandler = event => setSelectedAlbum(event.target.value)
  const selectedUserHandler = event => setSelectedUser(event.target.value)
  const youtubeUrlHandler = event => setYoutubeUrl(event.target.value)


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
      // setSelectedUser(data[0].id)
    }
    getSongWriters()
  }, [])

  useEffect(() => {
    const getSongWriter = async () => {
      const { data } = await axios(`${SERVER}/songwriters/${selectedUser}?_embed=albums`)
      setSongWriter(data)
      // setSelectedAlbum(data.albums && data.albums[0].id)
    }
    getSongWriter()
  }, [selectedUser])

  useEffect(()=>{
    const getSong = async () => {
      const { data } = await axios(`${SERVER}/songs/${ID}`)
      // setSong(data)
      const {albumId, songwriterId, songTitle, musicStyle, release, lyrics, songThumbnail, youtubeUrl} = data
      setSelectedAlbum(albumId)
      setSelectedUser(songwriterId)
      setSongTitle(songTitle)
      setMusicStyle(musicStyle)
      setSongRelease(release)
      setSongLyrics(lyrics)
      setSongThumbnail(songThumbnail)
      setYoutubeUrl(youtubeUrl)
  
    }
    getSong()
  },[ID])



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

    const editedSong = {
      albumId: Number(selectedAlbum),
      youtubeUrl,
      songwriterId: Number(selectedUser),
      songTitle: songTitle,
      musicStyle: musicStyle,
      release: Number(songRelease),
      lyrics: songLyrics,
      songThumbnail: songThumbnail
    }
    const res = await axios.put(`${SERVER}/songs/${ID}`, editedSong)
    if(res.status === 200){
      toast.success('Song successfully edited')
      navigation('/project/songslist')
    } else {
      toast.error('Something went wrong, song was not deleted...')
    }
  }


  return (
    <div className="edit-song-form-content-wrapper">
    <Link className="button-1" to='/project/songslist'>Back to songslist</Link>
    <h1 className="song-form-title">Edit song</h1>
    <form className="edit-song-form-wrapper" onSubmit={createSongFormHandler}>
    <div className="form-control">
        <label htmlFor="edit-song-title">Enter Song title</label>
        <input
          required
          type="text"
          id="edit-song-title"
          name="edit-song-title"
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
        <label htmlFor="edit-song-youtube-url">Enter youtube url of song</label>
        <input
          required
          type="text"
          id="edit-song-youtube-url"
          name="edit-song-youtube-url"
          onChange={youtubeUrlHandler}
          value={youtubeUrl}
        />
      </div>

      <div className="form-control">
        <label htmlFor="edit-song-release">Enter song release date</label>
        <input
          required
          type="number"
          min="1950"
          max="2023"
          id="edit-song-release"
          name="edit-song-release"
          onChange={songReleaseHandler}
          value={songRelease}
        />
      </div>

      <div className="form-control">
        <label htmlFor="edit-song-lyrics">Enter song lyrics</label>
        <textarea
          required
          type="text"
          id="edit-song-lyrics"
          name="edit-song-lyrics"
          onChange={songLyricsHandler}
          value={songLyrics}
        />
      </div>

      <div className="form-control">
        <label htmlFor="edit-song-thumbnail">Enter song thumbnail</label>
        <input
          required
          type="text"
          id="edit-song-thumbnail"
          name="edit-song-thumbnail"
          onChange={songThumbnailHandler}
          value={songThumbnail}
        />
      </div>

      <div className="form-control">
        <label htmlFor="select-song-writter">Select song Author</label>
        <select id="select-song-writter" onChange={selectedUserHandler} value={selectedUser}>
          {optionElements}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="select-album">Select album</label>
        <select id="select-album" onChange={selectedAlbumHandler} value={selectedAlbum}>
          {albumsOptionElements}
        </select>
      </div>



      <input className="button-1" type="submit" value="Edit song" />
    </form>
    </div>
  )
}

export default EditSongPage

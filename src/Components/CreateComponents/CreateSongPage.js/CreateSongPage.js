import './CreateSongPage.css'

import { useEffect, useState } from "react"

import axios from 'axios'
import { SERVER } from '../../Patrials/Config'

const CreateSongPage = ({ onCreateSongHandler }) => {



  const [songTitle, setSongTitle] = useState('')
  const [musicStyle, setMusicStyle] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [songLyrics, setSongLyrics] = useState('')
  const [songThumbnail, setSongThumbnail] = useState('')
  const [songWriters, setSongWriters] = useState('')


  const [songWriter, setSongWriter] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState('')

  const [selectedUser, setSelectedUser] = useState('')

  const songTitleHandler = event => setSongTitle(event.target.value)
  const musicStyleHandler = event => setMusicStyle(event.target.value)
  const songDurationHandler = event => setSongDuration(event.target.value)
  const songLyricsHandler = event => setSongLyrics(event.target.value)
  const songThumbnailHandler = event => setSongThumbnail(event.target.value)

  const selectedAlbumHandler = event => setSelectedAlbum(event.target.value)
  const selectedUserHandler = event => setSelectedUser(event.target.value)




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




  // albums.filter(album => album.id === selectedAlbum)




  const createSongFormHandler = async (event) => {
    event.preventDefault()

    // console.log(songTitle)//
    // console.log(musicStyle)//
    // console.log(songDuration)//
    // console.log(songLyrics)//
    // console.log(songThumbnail)
    // console.log(selectedAlbum)//


    const newSong = {
      albumId: Number(selectedAlbum),
      songwriterId: selectedUser,
      songTitle: songTitle,
      musicStyle: musicStyle,
      duration: songDuration,
      lyrics: songLyrics,
      songThumbnail: songThumbnail
    }
    console.log(newSong)
    onCreateSongHandler(newSong)

  }


  return (
    <form onSubmit={createSongFormHandler}>
      <div className="form-control">
        <label className="label-element" htmlFor="create-song-title">Enter Song title</label>
        <input
          // required
          type="text"
          id="create-song-title"
          name="create-song-title"
          onChange={songTitleHandler}
          value={songTitle}
        />
      </div>

      <div className="form-control">
        <label className="label-element" htmlFor="create-song-music-style">Enter music style</label>
        <input
          // required
          type="text"
          id="create-song-music-style"
          name="create-song-music-style"
          onChange={musicStyleHandler}
          value={musicStyle}
        />
      </div>

      <div className="form-control">
        <label className="label-element" htmlFor="create-song-duration">Enter song duration</label>
        <input
          // required
          type="text"
          id="create-song-duration"
          name="create-song-duration"
          onChange={songDurationHandler}
          value={songDuration}
        />
      </div>

      <div className="create-song-textarea-wrapper">
        <label className="label-element" htmlFor="create-song-lyrics">Enter song lyrics</label>
        <textarea
          // required
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
          // required
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

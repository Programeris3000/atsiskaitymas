import './CreateSongPage.css'

import { useEffect, useState } from "react"

import axios from 'axios'
import { SERVER } from '../../Patrials/Config'

const CreateSongPage = ({onCreateSongHandler}) => {



  const [songTitle, setSongTitle] = useState('')
  const [musicStyle, setMusicStyle] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [songLyrics, setSongLyrics] = useState('')
  const [songThumbnail, setSongThumbnail] = useState('')
  const [test, setTest] = useState('')
  // const [songWriters, setSongWriters] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [albums, setAlbums] = useState('')
  console.log(selectedAlbum)


  const songTitleHandler = event => setSongTitle(event.target.value)
  const musicStyleHandler = event => setMusicStyle(event.target.value)
  const selectedAlbumHandler = event => setSelectedAlbum(event.target.value)
  const songDurationHandler = event => setSongDuration(event.target.value)
  const songLyricsHandler = event => setSongLyrics(event.target.value)
  const songThumbnailHandler = event => setSongThumbnail(event.target.value)
  // const albumUserHandler = event => setSelectedUser(event.target.value)


  

  useEffect(()=>{
    const getAlbums = async () => {
      const {data} = await axios(`${SERVER}/albums`)
      setAlbums(data)
      setSelectedAlbum(data[0].id)
    }
    getAlbums()

    // const getSongWriters = async () => {
    //   const {data} = await axios(`${SERVER}/songwriters`)
    //   setSongWriters(data)
    // }
    // getSongWriters()
  },[])


  const optionElements = albums && albums.length > 0 && albums.map((album, index)=>{
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
    songwriterId: 2,
    songTitle: songTitle, 
    musicStyle: musicStyle,
    duration: songDuration,
    lyrics: songLyrics,
    songThumbnail: songThumbnail
  }
  // console.log(newSong)
  onCreateSongHandler(newSong)
    
  }



  return (
    <form onSubmit={createSongFormHandler}>
      <div form-control>
      <label htmlFor="create-song-title">Enter Song title</label>
      <input 
      // required
      type="text" 
      id="create-song-title" 
      name="create-song-title" 
      onChange={songTitleHandler}
      value={songTitle}
      />
      </div>

      <div form-control>
      <label htmlFor="create-song-music-style">Enter music style</label>
      <input 
      // required
      type="text" 
      id="create-song-music-style" 
      name="create-song-music-style" 
      onChange={musicStyleHandler}
      value={musicStyle}
      />
      </div>

      <div form-control>
      <label htmlFor="create-song-duration">Enter song duration</label>
      <input 
      // required
      type="text" 
      id="create-song-duration" 
      name="create-song-duration" 
      onChange={songDurationHandler}
      value={songDuration}
      />
      </div>

      <div form-control>
      <label htmlFor="create-song-lyrics">Enter song lyrics</label>
      <input 
      // required
      type="text" 
      id="create-song-lyrics" 
      name="create-song-lyrics" 
      onChange={songLyricsHandler}
      value={songLyrics}
      />
      </div>

      <div form-control>
      <label htmlFor="create-song-thumbnail">Enter song thumbnail</label>
      <textarea
      // required
      type="text" 
      id="create-song-thumbnail" 
      name="create-song-thumbnail" 
      onChange={songThumbnailHandler}
      value={songThumbnail}
      />
      </div>

      <div className="form-control">
      <label htmlFor="select-album">To wich album you want to add a song?</label>
      <select id="select-album" onChange={selectedAlbumHandler} value={selectedAlbum}>
        {optionElements}
      </select>
    </div>
    
      <input type="submit" value="Create song"/>
    </form>
  )
}

export default CreateSongPage

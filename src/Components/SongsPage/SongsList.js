import { useEffect, useState } from 'react'
import axios from 'axios'
import './SongsList.css'
import { SERVER } from '../Patrials/Config'
import SongItem from '../SingleComponents/SongItem/SongItem'
import { Link } from 'react-router-dom'
import CreateSongPage from '../CreateComponents/CreateSongPage.js/CreateSongPage'
import { toast } from 'react-toastify'

const SongsList = () => {
  const [songs, setSongs] = useState('')

  useEffect(()=>{
    const getSongs = async () => {
      const {data} = await axios(`${SERVER}/songs?_expand=songwriter&_expand=album`)
      setSongs(data)
    }
    getSongs()
  },[])


  const createSongHandler = async song => {
    const res = await axios.post(`${SERVER}/songs`, song)
        console.log(song)
        if (res.statusText === 'Created') {
          toast.success('Song successfully created')
          setSongs(prevState => [res.data,...prevState])
        } else {
          toast.error('Something went wrong')
        }
  }



  const deleteSongHandler = songId => {
    axios.delete(`${SERVER}/songs/${songId}`)
      .then((res) => {
        setSongs(prevState => {
          let updatedSong = { ...prevState };
          updatedSong = prevState.filter(song => song.id !== songId)
          return updatedSong
        })

        if (res.statusText === 'OK') {
          toast.success('Album successfuly deleted')
        } else {
          toast.error('Something went wrong, Album was not deleted...')
        }
      })
  }







  const splitSongs = songs && songs.map((song, index)=>{
    return(
      <SongItem onDeleteSongHandler={deleteSongHandler} data={song} key={index}/>
    )
  })

  return (
    <>
    <h1 className="songs-page-title">Songs list</h1>
      <div className="songs-page-wrapper">

        <div className="songs-form-wrapper">
            <CreateSongPage onCreateSongHandler={createSongHandler}/>
          </div>

        <div className="songs-list-wrapper">
         {splitSongs}
        </div>
      </div>

    </>
  )
}

export default SongsList
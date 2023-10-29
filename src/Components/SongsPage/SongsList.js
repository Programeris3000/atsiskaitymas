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

  const splitSongs = songs && songs.map((song, index)=>{
    return(
      <SongItem data={song} key={index}/>
    )
  })

  return (
    <>
    <h1>Songs list</h1>
    <CreateSongPage onCreateSongHandler={createSongHandler}/>
    {splitSongs}
    </>
  )
}

export default SongsList
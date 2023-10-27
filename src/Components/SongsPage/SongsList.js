import { useEffect, useState } from 'react'
import axios from 'axios'
import './SongsList.css'
import { SERVER } from '../Patrials/Config'
import SongItem from '../SingleComponents/SongItem/SongItem'

const SongsList = () => {
  const [songs, setSongs] = useState('')

  useEffect(()=>{
    const getSongs = async () => {
      const {data} = await axios(`${SERVER}/songs?_expand=songwriter&_expand=album`)
      setSongs(data)
    }
    getSongs()
  },[])

  const splitSongs = songs && songs.map((song, index)=>{
    return(
      <SongItem data={song} key={index}/>
    )
  })

  return (
    <>
    <h1>Songs list</h1>
    {splitSongs}
    </>
  )
}

export default SongsList
import { useEffect, useState } from 'react'
import { SERVER } from '../Patrials/Config'
import axios from 'axios'
import './SongWritersList.css'
import WriterItem from '../SingleComponents/WriterItem/WriterItem'


const SongWritersList = () => {

  const [writers, setWriters] = useState([])
    console.log(writers)
  useEffect(()=>{
    const getSongWriters = async () =>{
    const {data} = await axios(`${SERVER}/songwriters`)
      setWriters(data)
    }
    getSongWriters()

  },[])

  const splitWriters = writers.map((data, index)=>{
    return(
        <WriterItem data={data} key={index}/>
    )
  })     

  return (
    <>
    <h1 className="song-writers-title">Our clients</h1>
    <div className="song-writers-wrapper">
      {splitWriters}
    </div>
    </>
    
  )
}

export default SongWritersList
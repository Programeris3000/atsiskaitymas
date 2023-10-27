import { useEffect, useState } from 'react'
import { SERVER } from '../Patrials/Config'
import axios from 'axios'
import './SongWritersList.css'
import WriterItem from '../SingleComponents/WriterItem/WriterPage'


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
      <div className="song-writers-list">
        <WriterItem data={data} key={index}/>
      </div>
    )
  })     

  return (
    <>
   <h1>Song writers</h1>
    {splitWriters}
    </>
  )
}

export default SongWritersList
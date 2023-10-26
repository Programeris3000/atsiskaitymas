import { useEffect, useState } from "react"
import { SERVER } from "../Patrials/Config"
import axios from "axios"
import WriterPage from "../../SingleComponents/WriterPage"
import Card from "../Card/Card"


const SongWritersPage = () => {

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
        <WriterPage data={data} key={index}/>
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

export default SongWritersPage
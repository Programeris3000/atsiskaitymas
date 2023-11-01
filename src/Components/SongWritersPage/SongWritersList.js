import { useEffect, useState } from 'react'
import { SERVER } from '../Patrials/Config'
import axios from 'axios'
import './SongWritersList.css'
import WriterItem from '../SingleComponents/WriterItem/WriterItem'
import CreateSongWriter from '../CreateComponents/CreateSongWriter/CreateSongWriter'
import { toast } from 'react-toastify'


const SongWritersList = () => {

  const [writers, setWriters] = useState([])

  useEffect(() => {
    const getSongWriters = async () => {
      const { data } = await axios(`${SERVER}/songwriters?_sort=id&_order=desc`)
      setWriters(data)
    }
    getSongWriters()

  }, [])

  const CreateSongWriterHandler = async songwriter => {
    const res = await axios.post(`${SERVER}/songwriters`, songwriter)
    console.log(songwriter)
    if (res.statusText === 'Created') {
      toast.success('Songwriter successfully created')
      setWriters(prevState => [res.data, ...prevState])
    } else {
      toast.error('Something went wrong')
    }
  }

  const deleteSongWriterHandler = songwriterId => {
    axios.delete(`${SERVER}/songwriters/${songwriterId}`)
      .then((res) => {
        setWriters(prevState => {
          let updatedSongwriter = { ...prevState };
          updatedSongwriter = prevState.filter(writer => writer.id !== songwriterId)
          return updatedSongwriter
        })

        if (res.statusText === 'OK') {
          toast.success('Songwriter successfuly deleted')
        } else {
          toast.error('Something went wrong, Songwriter was not deleted...')
        }
      })
  }


  const splitWriters = writers.map((data, index) => {
    return (
      <WriterItem onDeleteSongWriterHandler={deleteSongWriterHandler} data={data} key={index} />
    )
  })

  return (
    <>
      <h1 className="song-writers-title">Our clients</h1>
      <div className="song-writers-wrapper">
        {splitWriters}
      </div>
      <CreateSongWriter onCreateSongWriterHandler={CreateSongWriterHandler} />
    </>
  )
}

export default SongWritersList
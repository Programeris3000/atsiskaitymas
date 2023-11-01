import { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../Patrials/Config'
import AlbumItem from '../SingleComponents/AlbumItem/AlbumItem'
import { toast } from 'react-toastify'
import CreateAlbumPage from '../CreateComponents/CreateAlbum/CreateAlbumPage'
import './AlbumList.css'


const AlbumsList = () => {
  const [albums, setAlbums] = useState([])


  useEffect(() => {
    const getAlbums = async () => {
      const { data } = await axios(`${SERVER}/albums?_sort=id&_order=desc`)
      setAlbums(data)
    }
    getAlbums()
  }, [])


  const deleteAlbumHandler = albumId => {
    axios.delete(`${SERVER}/albums/${albumId}`)
      .then((res) => {
        setAlbums(prevState => {
          let updatedAlbum = { ...prevState };
          updatedAlbum = prevState.filter(album => album.id !== albumId)
          return updatedAlbum
        })

        if (res.statusText === 'OK') {
          toast.success('Album successfuly deleted')
        } else {
          toast.error('Something went wrong, Album was not deleted...')
        }
      })
  }

  const createAlbumHandler = async album => {
    const res = await axios.post(`${SERVER}/albums`, album)
        console.log(album)
        if (res.statusText === 'Created') {
          toast.success('Album successfully created')
          setAlbums(prevState => [res.data,...prevState])
        } else {
          toast.error('Something went wrong')
        }
        
  }




  const splitAlbums = albums && albums.map((album, index) => {
    return (
      <AlbumItem onDeleteAlbumHandler={deleteAlbumHandler} data={album} key={index} />
    )
  })

  return (
    <>
      <h1 className="albums-page-title">Check-out our clients albums</h1>
    <div className="album-page-wrapper">

      <div className="albums-wrapper">
        {splitAlbums}
      </div>
      
      <div className="form-wrapper">
        <h2 className="form-wrapper-title">Create album</h2>
        <CreateAlbumPage onCreateAlbumHandler={createAlbumHandler}/>
      </div>
      
    </div>
    </>
  )
}

export default AlbumsList
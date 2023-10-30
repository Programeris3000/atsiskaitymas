import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER } from '../Patrials/Config'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './GaleryPage.css'
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import CreateImage from '../CreateComponents/CreateImage/CreateImage';

const GaleryPage = () => {
  const [galery, setGalery] = useState('')

  useEffect(() => {
    const getGalery = async () => {
      const { data } = await axios(`${SERVER}/galery`)
      setGalery(data)
    }
    getGalery()
  }, [])

  const buttonDeleteHandler = (id) => {
        axios.delete(`${SERVER}/galery/${id}`)
      .then((res) => {
        setGalery(prevState => {
          let updatedGalery = { ...prevState };
          updatedGalery = prevState.filter(photo => photo.id !== id)
          return updatedGalery
        })
        if (res.statusText === 'OK') {
          toast.success('Photo successfuly deleted')
        } else {
          toast.error('Something went wrong, Photo was not deleted...')
        }
      })
  }

  const createPhotoHandler = async photo => {
    const res = await axios.post(`${SERVER}/galery`, photo)
        console.log(photo)
        if (res.statusText === 'Created') {
          toast.success('Photo successfully created')
          setGalery(prevState => [res.data,...prevState])
        } else {
          toast.error('Something went wrong')
        }
  }



  return (
    galery && galery.length > 0 ? (
      <>
        <h1 className="studio-galery-title">Check out our studio galery</h1>

        <div className="galery-page-wrapper">

          {
            <Carousel className="carousel">

              {galery.map(item => 
              <div className="image-wrapper" key={item.id}>
                <img className="carousel-img"  src={item.photoUrl} alt={item.alt} />
                <button className="carousel-delete-button" onClick={()=> buttonDeleteHandler(item.id)}>Delete image</button>
              </div>)}

            </Carousel>
          }
          <CreateImage onCreatePhotoHandler={createPhotoHandler}/>
        </div>
      </>) : (<TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />)
  )
}

export default GaleryPage
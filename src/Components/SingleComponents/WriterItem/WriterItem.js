import { Link, useParams } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import './WriterItem.css'

const WriterItem = ({ data , key }) => {
  const { biography, id, name, photoUrl } = data

  return (
    <>
      {data ? (
          <div key={key} className="song-writer-item">     

          <div className="song-writer-content-wrapper">
            <h2 className="song-writer-name">{name}</h2>
            {data.photoUrl && <div className="song-writer-image-content-wrapper">
              <img className="song-writer-image" src={photoUrl} alt={name}/>
            <p className="song-writer-biography">{biography}</p>
            </div>}
          </div>

            <Link className="button-1" to={`/project/songwriterslist/${id}`}>Read more about {name}</Link>
      
          </div>
      ) : (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </>
  )
}

export default WriterItem
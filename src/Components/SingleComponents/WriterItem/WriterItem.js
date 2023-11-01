import { Link } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"
import './WriterItem.css'

const WriterItem = ({ data, key, onDeleteSongWriterHandler }) => {
  const { biography, id, name, photoUrl } = data




  return (
    <>
      {data && name ? (

        <div key={key} className="song-writer-item">
          <div className="song-writer-content-wrapper">
            <h2 className="song-writer-name">{name}</h2>
            {data.photoUrl && <div className="song-writer-image-content-wrapper">
              <img className="song-writer-image" src={photoUrl} alt={name} />
              <p className="song-writer-biography">{biography}</p>
            </div>}
          </div>

          <div className="song-writers-list-buttons-wrapper">
            <Link className="button-1" to={`/project/songwriterslist/${id}/editsongwriterpage`}>Edit songwriter</Link>
            <button className="button-1" onClick={() => onDeleteSongWriterHandler(id)}>Delete songwriter</button>
            <Link className="button-1" to={`/project/songwriterslist/${id}`}>Read more about {name}</Link>
          </div>

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
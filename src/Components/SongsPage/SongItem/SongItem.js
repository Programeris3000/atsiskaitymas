import { Link } from 'react-router-dom'
import './SongItem.css'
import { TailSpin } from 'react-loader-spinner'

const SongItem = ({ data,  onDeleteSongHandler }) => {
  const { songTitle, release, songwriter, songThumbnail, id, album} = data
  
  const deleteSongHandler = () => {
    onDeleteSongHandler(id)
  }
  
  return (
    <>
      {data ? (
        <div className="song-item-wrapper" >

          <div className="content-wrapper">
            <Link className="button-1" to={`/project/songslist/${id}`}>Read more about this song...</Link>
            <h2 className="song-title-element">{songTitle}</h2>
            <img className="song-cover-image" src={songThumbnail} alt={songTitle} />
            <span className="song-creator-name">{songwriter && songwriter.name}</span>
            <span className="song-album-pre-title">Album</span>
            <span className="song-album-title">{album && album.title}</span>
            <span className="song-release-date">Released : {release}</span>
          </div>

          <div className="buttons-wrapper">
            <Link className="button-1" to={`/project/songslist/${id}/editsongpage`}>Edit Song</Link>
            <button className="button-1" onClick={deleteSongHandler}>Delete song</button>
          </div>

        </div>) : (<TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />)}
    </>
  )
}

export default SongItem
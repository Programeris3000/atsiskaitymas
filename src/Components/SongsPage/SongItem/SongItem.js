import { Link } from 'react-router-dom'
import './SongItem.css'

const SongItem = ({ data, key, onDeleteSongHandler }) => {

  const { songTitle, release, songwriter, songThumbnail, id, album} = data

  const deleteSongHandler = () => {
    onDeleteSongHandler(id)
  }

  return (
    <>
      {data ? (
        <div className="song-item-wrapper" key={key}>

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

        </div>) : (<p></p>)}
    </>
  )
}

export default SongItem
import { Link } from 'react-router-dom'
import Card from '../../Card/Card'
import './SongItem.css'

const SongItem = ({data, key, onDeleteSongHandler}) => {
  const {songTitle, duration, lyrics, songwriter, songThumbnail, album, id} = data

  const deleteSongHandler = ()=>{
    onDeleteSongHandler(id)
  }

  return (
    <div>
      {data ? (
      <Card key={key}>
        <button onClick={deleteSongHandler}>Delete song</button>
        <Link to={`/project/songslist/${id}`}>Read more about this song...</Link>
        <h2>{songTitle}</h2>
        <img src={songThumbnail} alt={songTitle}/>
        <p>Song created by {songwriter && songwriter.name}</p>
        <p>Album: {album && album.title}</p>
        <p>Duration : {duration}min.</p>
        <p>Lyrics part {lyrics}</p>

      </Card>) : (<p></p>)}
    </div>
  )
}

export default SongItem
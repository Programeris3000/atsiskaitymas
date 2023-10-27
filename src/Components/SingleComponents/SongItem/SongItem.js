import Card from '../../Card/Card'
import './SongItem.css'

const SongItem = ({data}, {key}) => {
  console.log(data)
  const {songTitle, duration, lyrics, songwriter, songThumbnail, album} = data
  const {name} = songwriter
  const {title} = album


  return (
    <div>
      {data ? (
      <Card key={key}>
        <h2>{songTitle}</h2>
        <img src={songThumbnail} alt={songTitle}/>
        <span>Song created by {name}</span>
        <span>Album: {title}</span>
        <span>Duration : {duration}min.</span>
        <p>Lyrics part {lyrics}</p>

      </Card>) : (<p></p>)}
    </div>
  )
}

export default SongItem
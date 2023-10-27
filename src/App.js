import { Route, Routes } from "react-router-dom"
import './App.css'
import SongWritersList from "./Components/SongWritersPage/SongWritersList";
import NavigationPage from "./Components/NavigationPage/NavigationPage";
import MainPage from "./Components/MainPage/MainPage";
import Container from "./Components/Container/Container";
import AlbumsList from "./Components/AlbumsPage/AlbumsList";
import SongsList from "./Components/SongsPage/SongsList";
import WriterPage from "./Components/SingleComponents/WriterPage/WriterPage";
import AlbumPage from "./Components/SingleComponents/AlbumPage/AlbumPage";
import SongPage from "./Components/SingleComponents/SongPage/SongPage";

function App() {
  return (
    <>
      <Container>
        <NavigationPage />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path="/project/songwriterslist" element={<SongWritersList />} />
          <Route path="/project/songwriterslist/:ID" element={<WriterPage />} />
          <Route path='/project/albumslist' element={<AlbumsList />} />
          <Route path='/project/albumslist/:ID' element={<AlbumPage />} />
          <Route path='/project/songslist' element={<SongsList />} />
          <Route path='/project/songslist/:ID' element={<SongPage />} />
        </Routes>
      </Container>

      
    </>
  )
}

export default App;

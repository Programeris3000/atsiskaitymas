import { Route, Routes } from "react-router-dom"
import './App.css'
import SongWritersPage from "./Components/SongWritersPage/SongWritersPage";
import NavigationPage from "./Components/NavigationPage/NavigationPage";
import MainPage from "./Components/MainPage/MainPage";
import AlbumsPage from "./Components/AlbumsPage/AlbumsPage";
import SongsPage from "./Components/SongsPage/SongsPage";
import Container from "./Components/Container/Container";
import WriterPage from "./SingleComponents/WriterPage";

function App() {
  return (
    <>
      <Container>
        <NavigationPage />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path="/project/songwriters" element={<SongWritersPage />} />
          <Route path="/project/songwriters/:ID" element={<WriterPage />} />
          <Route path='/project/albumspage' element={<AlbumsPage />} />
          <Route path='/project/songspage' element={<SongsPage />} />
        </Routes>
      </Container>

      
    </>
  )
}

export default App;

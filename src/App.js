import { Route, Routes } from "react-router-dom"
import SongWritersList from "./Components/SongWritersPage/SongWritersList";
import NavigationPage from "./Components/NavigationPage/NavigationPage";
import MainPage from "./Components/MainPage/MainPage";
import Container from "./Components/Container/Container";
import AlbumsList from "./Components/AlbumsPage/AlbumsList";
import SongsList from "./Components/SongsPage/SongsList";
import WriterPage from "./Components/SingleComponents/WriterPage/WriterPage";
import AlbumPage from "./Components/SingleComponents/AlbumPage/AlbumPage";
import SongPage from "./Components/SingleComponents/SongPage/SongPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import CreateAlbumPage from "./Components/CreateComponents/CreateAlbum/CreateAlbumPage";
import EditAlbumPage from "./EditComponents/EditAlbumPage";
import CreateSongPage from "./Components/CreateComponents/CreateSongPage.js/CreateSongPage";
import EditSongPage from "./EditComponents/EditSongPage";
import GaleryPage from "./Components/GaleryPage/GaleryPage";
import EditAwardsPage from "./EditComponents/EditAwardsPage"

function App() {


  return (
    <>
      <Container>
        <NavigationPage />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/project/:ID/editalbumpage' element={<EditAwardsPage />} />
          <Route path="/project/songwriterslist" element={<SongWritersList />} />
          <Route path="/project/songwriterslist/:ID" element={<WriterPage />} />
          <Route path='/project/albumslist' element={<AlbumsList />} />
          <Route path='/project/albumslist/:ID' element={<AlbumPage />} />
          <Route path='/project/albumslist/createalbumpage' element={<CreateAlbumPage />} />
          <Route path='/project/albumslist/:ID/editalbumpage' element={<EditAlbumPage />} />
          <Route path='/project/songslist' element={<SongsList />} />
          <Route path='/project/songslist/:ID' element={<SongPage />} />
          <Route path='/project/songslist/createsongpage' element={<CreateSongPage />} />
          <Route path='/project/songslist/:ID/editsongpage' element={<EditSongPage />} />
          <Route path='/project/galery' element={<GaleryPage />} />

        </Routes>
      </Container>
      
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      
    </>
  )
}

export default App;

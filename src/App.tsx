import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import CutImage from './pages/CutImage';
import ImageProvider from './contexts/ImageContext';

function App() {
  return <BrowserRouter>
    <div id="body-container">
      <Link to="/" id="title-container">My Kraft</Link>
      <div id="content-container">
        <ImageProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cut-image" element={<CutImage />} />
          </Routes>
        </ImageProvider>
      </div>
    </div>
  </BrowserRouter>
}

export default App;

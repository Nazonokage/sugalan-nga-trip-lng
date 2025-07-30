// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import VideosPage from './pages/VideosPage';
import HeckedPage from './pages/HeckedPage'
import StreamingPage from './pages/StreamingPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/streaming/:videoId" element={<StreamingPage />} />
        <Route path="/streaming/vid-hacked" element={<HeckedPage />} />      
    </Routes>
    </div>
  );
}

export default App;
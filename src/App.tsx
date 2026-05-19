import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reader" element={<ReaderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MealsPage from './pages/meals/MealsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/meals" />} />
          <Route path="/meals" element={<MealsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


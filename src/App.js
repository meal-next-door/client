import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateComment from './components/CreateComment';
import Footer from './components/Footer';
import CooksList from './pages/CooksList';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from './components/IsAnon';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="new-comment" element={<CreateComment />}></Route>
        <Route path="cooks" element={<CooksList />}></Route>
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

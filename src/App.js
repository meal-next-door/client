import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateComment from './components/CreateComment';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="new-comment" element={<CreateComment />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

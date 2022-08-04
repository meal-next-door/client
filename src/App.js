import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateComment from './components/CreateComment';
import Footer from './components/Footer';
import CooksList from './pages/CooksList';
import CookDetailsPage from './pages/DetailsOfCook';
import ProfilePage from './pages/Profile';
import MealsList from './pages/MealsList';
import MealDetails from './pages/MealDetails';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="new-comment" element={<CreateComment />}></Route>
        <Route path="cooks" element={<CooksList />}></Route>
        <Route path="cooks/:cookId" element={<CookDetailsPage />}></Route>
        <Route path="profile/:userId" element={<ProfilePage />}></Route>
        <Route path="meals" element={<MealsList />}></Route>
        <Route path="meals/:mealId" element={<MealDetails />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

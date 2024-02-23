import { Routes, Route} from 'react-router-dom';
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  return (
    <div className="pages">
      {['/', '/movies', '/saved-movies','/profile'].includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {['/', '/movies', '/saved-movies'].includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;

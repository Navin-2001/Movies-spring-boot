import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

// Create a base URL constant - easier to change when needed
const API_BASE_URL = 'http://localhost:8080'; // Use this when testing locally
// const API_BASE_URL = 'https://your-new-ngrok-url'; // Use this when using ngrok

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/movies`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await axios.get(`${API_BASE_URL}/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;

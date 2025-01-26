import { useEffect, useRef, useState } from "react";
import Search from "./Component/Search/Search";
import Spinner from "./Component/Spinner/Spinner";
import MovieCard from "./Component/Card/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./Appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingMovies, settrendingMovies] = useState([]);


  const searchTimeout = useRef(null); 

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results || []);
      if( query && data.results.length > 0){
        await updateSearchCount(query,data.results[0])
      }
    } catch (error) {
      setErrorMessage("Error while fetching movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async() =>{
      try {
        const movies = await getTrendingMovies();
        settrendingMovies(movies);
      } catch (error) {
          console.log("Error Fetching Trending Moveies" + error)
      }
  }

  useEffect(() => {
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }


    searchTimeout.current = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 1000); 

    return () => clearTimeout(searchTimeout.current);
  }, [searchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  },[])
  return (
    <main className="overflow-x-hidden">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        { trendingMovies.length > 0 && (
          <div className="trending">
            <h2>Trending Movies</h2>
            <ul>
              { trendingMovies.map((m,i)=>(
                <li key={m.$id}>
                  <p>{i+1}</p>
                  <img src={m.Poster_URL} alt={m.title} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <section className="all-movies">
          <h2 >All Movies</h2>
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;

import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  const searchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name!");
      setMovies([]);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No results found!");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🎬 Movie Search App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && (
        <div className="loading-container">
          <img
            src="https://loading.io/asset/800261"
            alt="Loading..."
            className="spinner"
          />
          <p>Loading...</p>
        </div>
      )}

      {!loading && error && <p className="error">{error}</p>}

      {!loading && movies.length === 0 && !error && (
        <div className="no-results">
          <p>Start searching for your favorite movies! 🍿</p>
        </div>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() =>
              window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")
            }
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

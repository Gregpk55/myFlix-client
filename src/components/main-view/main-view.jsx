import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";



export const MainView = () => {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        fetch("https://greg-kennedy-myflix.herokuapp.com/movies")
          .then((response) => response.json())
          .then((data) => {
            if (data) { // Check if data.docs is defined
                const moviesFromApi = data.map((doc) => {
                    return {
                      id: doc._id,
                      title: doc.Title,
                      image: doc.ImagePath,
                      director: doc.Director.Name,
                      genre: doc.Genre.Name,
                    };
                  });
      
              setMovies(moviesFromApi);
            }
          });
      }, []);

      const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                }}
            />
        ))}
        </div>
    );
}
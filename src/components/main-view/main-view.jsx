import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://git.heroku.com/greg-kennedy-myflix.git")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
                return {
                    id: doc.key,
                    title: doc.title,
                    image: doc.image,
                    director: doc.director_name?.[0],
                    genre: doc.genre
                };
            });

            setMovies(moviesFromApi);
        });
    }, []);

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
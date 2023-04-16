import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id:1,
            title: "Sahara",
            description: "Based on a novel by Clive Cussler, this film follows adventurer Dirk Pitt as he searches for a lost Civil War battleship in the Sahara Desert.",
            genre: "Adventure",
            image:
            "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcREzxxqXBeVyZHSLBgnPGleeri9oD6AWVaBG0MPWW8sTn3rrN2y",
            director: "Breck Eisner"
        },

        {
            id:2,
            title: "Sicario",
            description: "A young FBI agent is recruited by a government task force to help take down a Mexican drug cartel, but soon discovers that the lines between good and evil are blurred in this dangerous world.",
            genre: "Thriller",
            image:
            "https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_FMjpg_UX1000_.jpg",
            director: "Denis Villeneuve"
        },

        {
            id:3,
            title: "Blow",
            description: "Based on a true story, this film follows the rise and fall of George Jung, a drug dealer who became one of the biggest cocaine traffickers in the United States in the 1970s.",
            genre: "Drama",
            image:
            "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSINbgOLNzBP4-HW2q9SklY6GLwcvEOd-9C9tsxMOKtZ1hxk8E-",
            director: "Ted Demme"
        }
    ]);

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
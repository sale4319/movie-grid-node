import { Movie } from "../types";

export const getUniqueMovies = (movies: Movie[]): Movie[] => {
  return movies
    .filter((movie) => movie.poster_path !== null)
    .filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id) &&
        movie.poster_path !== null
    )
    .sort((a, b) => b.ratings[0].rating - a.ratings[0].rating);
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}.`;
}

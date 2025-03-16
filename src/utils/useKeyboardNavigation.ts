import { useEffect } from "react";
import { Movie } from "../types";

export const useKeyboardNavigation = (
  uniqueMovies: Movie[],
  selected: number | null,
  setSelected: (id: number) => void,
  toggleFavourite: (id: number) => void,
  columns: number
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        const currentIndex = uniqueMovies.findIndex(
          (movie) => movie.id === selected
        );
        let newIndex = currentIndex;

        if (event.key === "ArrowRight") {
          newIndex = (currentIndex + 1) % uniqueMovies.length;
        } else if (event.key === "ArrowLeft") {
          newIndex =
            (currentIndex - 1 + uniqueMovies.length) % uniqueMovies.length;
          if (newIndex < 0) newIndex = 0;
        } else if (event.key === "ArrowDown") {
          newIndex = (currentIndex + columns) % uniqueMovies.length;
        } else if (event.key === "ArrowUp") {
          newIndex = currentIndex - columns;
          if (newIndex < 0) newIndex = 0;
        }

        if (newIndex === uniqueMovies.length - 1) {
          newIndex = 0;
        }

        setSelected(uniqueMovies[newIndex].id);
      } else if (event.key === "Enter" && selected !== null) {
        toggleFavourite(selected);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, uniqueMovies, setSelected, toggleFavourite, columns]);
};

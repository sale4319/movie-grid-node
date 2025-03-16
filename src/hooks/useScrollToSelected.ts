import { useEffect, RefObject } from "react";
import { Movie } from "../types";

export const useScrollToSelected = (
  selected: number | null,
  uniqueMovies: Movie[],
  itemRefs: RefObject<(HTMLDivElement | null)[]>,
  currentPage: number,
  totalPages: number,
  itemsPerPage: number,
  handleLoadMore: () => void
) => {
  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem("selectedMovie", selected.toString());
      const selectedIndex = uniqueMovies.findIndex(
        (movie) => movie.id === selected
      );
      if (itemRefs.current[selectedIndex]) {
        itemRefs.current[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      if (
        selectedIndex >= currentPage * itemsPerPage &&
        currentPage < totalPages
      ) {
        handleLoadMore();
      }
    } else {
      localStorage.removeItem("selectedMovie");
    }
  }, [
    selected,
    uniqueMovies,
    itemRefs,
    currentPage,
    totalPages,
    itemsPerPage,
    handleLoadMore,
  ]);
};

import { useRef, useState } from "react";
import { GridItem } from "../../components";
import { BASE_URL, FILE_SIZE } from "../../constants";
import { LoadMoreButton } from "../../components";
import {
  useLocalStorage,
  useKeyboardNavigation,
  useScrollToSelected,
} from "../../hooks";

import movies from "../../mocks/moviesFixture.json";
import styles from "./MainGrid.module.css";
import { Movie } from "../../types";

export default function MainGrid() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useLocalStorage<number | null>(
    "selectedMovie",
    null
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 18;
  const columns = 6;

  const handleSelect = (id: number) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  };

  const toggleFavourite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const uniqueMovies: Movie[] = movies
    .filter((movie) => movie.poster_path !== null)
    .filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id) &&
        movie.poster_path !== null
    )
    .sort((a, b) => b.ratings[0].rating - a.ratings[0].rating);

  const totalPages = Math.ceil(uniqueMovies.length / itemsPerPage);
  const currentMovies = uniqueMovies.slice(0, currentPage * itemsPerPage);

  useKeyboardNavigation(
    uniqueMovies,
    selected,
    setSelected,
    toggleFavourite,
    columns
  );

  useScrollToSelected(
    selected,
    uniqueMovies,
    itemRefs,
    currentPage,
    totalPages,
    itemsPerPage,
    handleLoadMore
  );
  return (
    <>
      <div data-testid="main-grid" className={styles.mainGrid}>
        {currentMovies.map((item, index) => (
          <GridItem
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            title={item.title}
            date={item.release_date}
            posterUrl={`${BASE_URL}${FILE_SIZE}${item.poster_path}`}
            backdropUrl={`${BASE_URL}${FILE_SIZE}${item.backdrop_path}`}
            isSelected={selected === item.id}
            inFavorites={favorites.includes(item.id)}
            toggleFavourite={() => toggleFavourite(item.id)}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
      </div>
      {currentPage < totalPages && (
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      )}
    </>
  );
}

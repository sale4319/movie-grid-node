import { useCallback, useRef, useState } from "react";
import { GridItem } from "../../components";
import { LoadMoreButton } from "../../components";
import {
  useLocalStorage,
  useKeyboardNavigation,
  useScrollToSelected,
} from "../../hooks";
import { debounce, getImageSrc, getUniqueMovies } from "../../utils";
import { Movie } from "../../types";

import movies from "../../mocks/moviesFixture.json";
import styles from "./MainGrid.module.css";

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

  const uniqueMovies: Movie[] = useCallback(
    () => getUniqueMovies(movies),
    [movies]
  )();

  const totalPages = Math.ceil(uniqueMovies.length / itemsPerPage);
  const currentMovies = uniqueMovies.slice(0, currentPage * itemsPerPage);

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

  const handleLoadMore = debounce(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, 300);

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
            posterUrl={getImageSrc(item.poster_path)}
            backdropUrl={getImageSrc(item.backdrop_path)}
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

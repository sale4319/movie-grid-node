import { useEffect, useRef, useState } from "react";
import { GridItem } from "../../components";
import { BASE_URL, FILE_SIZE } from "../../constants";

import movies from "../../mocks/moviesFixture.json";
import styles from "./MainGrid.module.css";

export default function MainGrid() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
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

  const uniqueMovies = movies
    .filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    )
    .sort((a, b) => b.ratings[0].rating - a.ratings[0].rating);

  const totalPages = Math.ceil(uniqueMovies.length / itemsPerPage);
  const currentMovies = uniqueMovies.slice(0, currentPage * itemsPerPage);

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
        } else if (event.key === "ArrowDown") {
          newIndex = (currentIndex + columns) % uniqueMovies.length;
        } else if (event.key === "ArrowUp") {
          newIndex =
            (currentIndex - columns + uniqueMovies.length) %
            uniqueMovies.length;
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
  }, [selected, uniqueMovies]);

  useEffect(() => {
    if (selected !== null) {
      const selectedIndex = uniqueMovies.findIndex(
        (movie) => movie.id === selected
      );
      if (itemRefs.current[selectedIndex]) {
        itemRefs.current[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selected, uniqueMovies]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

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
        <div className={styles.loadMore}>
          <button tabIndex={0} onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}

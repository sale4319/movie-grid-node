import { useState } from "react";
import { GridItem } from "../../components";
import { BASE_URL, FILE_SIZE } from "../../constants";

import movies from "../../mocks/moviesFixture.json";
import styles from "./MainGrid.module.css";

export default function MainGrid() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  };

  const uniqueMovies = movies
    .filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    )
    .sort((a, b) => b.ratings[0].rating - a.ratings[0].rating);

  return (
    <div data-testid="main-grid" className={styles.mainGrid}>
      {uniqueMovies.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          date={item.release_date}
          posterUrl={`${BASE_URL}${FILE_SIZE}${item.poster_path}`}
          backdropUrl={`${BASE_URL}${FILE_SIZE}${item.backdrop_path}`}
          isSelected={selected === item.id}
          onSelect={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
}

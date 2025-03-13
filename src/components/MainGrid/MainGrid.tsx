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
  return (
    <div data-testid="main-grid" className={styles.mainGrid}>
      {movies.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          date={item.release_date}
          posterUrl={`${BASE_URL}${FILE_SIZE}${item.poster_path}`}
          isSelected={selected === item.id}
          onSelect={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
}

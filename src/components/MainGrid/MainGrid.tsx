import { GridItem } from "../../components";
import movies from "../../mocks/moviesFixture.json";

import styles from "./MainGrid.module.css";

const BASE_URL = "https://image.tmdb.org/t/p/";
const FILE_SIZE = "w500";

export default function MainGrid() {
  return (
    <div data-testid="main-grid" className={styles.mainGrid}>
      {movies.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          date={item.release_date}
          posterUrl={`${BASE_URL}${FILE_SIZE}${item.poster_path}`}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import { FavouriteButton } from "../../components";

import hboLogo from "../../assets/hbo.svg";
import styles from "./GridItem.module.css";

type GridItemProps = {
  posterUrl: string;
  title: string;
  date?: string;
};

export function GridItem({ posterUrl, date, title }: GridItemProps) {
  if (!date) {
    return null;
  }

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  const selectedMode = selected ? styles.selected : "";

  return (
    <div
      className={[styles.movieCard, selectedMode].join(" ")}
      onClick={handleSelect}
      data-testid="grid-item"
    >
      <img src={posterUrl} alt={title} className={styles.movieImage} />

      <div className={styles.movieInfoWrapper}>
        <div className={styles.hboStrip}>
          <img src={hboLogo} className={styles.hboLogo} alt="hbo-logo" />
        </div>
        <div className={[styles.movieTitle, selectedMode].join(" ")}>
          {title}
        </div>
        <div className={styles.movieDateContainer}>
          <div className={[styles.movieDate, selectedMode].join(" ")}>
            {date}
          </div>
          <FavouriteButton selected={selected} />
        </div>
      </div>
    </div>
  );
}

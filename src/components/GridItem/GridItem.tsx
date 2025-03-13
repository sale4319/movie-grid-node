import { FavouriteButton } from "../../components";
import { formatDate } from "../../utils";

import hboLogo from "../../assets/hbo.svg";
import styles from "./GridItem.module.css";

type GridItemProps = {
  posterUrl: string;
  title: string;
  date?: string;
  isSelected: boolean;
  onSelect: () => void;
};

export function GridItem({
  posterUrl,
  date,
  title,
  isSelected,
  onSelect,
}: GridItemProps) {
  if (!date) {
    return null;
  }
  const formattedDate = formatDate(date);
  const selectedMode = isSelected ? styles.selected : "";

  return (
    <div
      className={[styles.movieCard, selectedMode].join(" ")}
      onClick={onSelect}
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
            {formattedDate}
          </div>
          <FavouriteButton selected={isSelected} />
        </div>
      </div>
    </div>
  );
}

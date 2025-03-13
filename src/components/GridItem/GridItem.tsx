import { FavouriteButton } from "../../components";
import { formatDate } from "../../utils";

import hboLogo from "../../assets/hbo.svg";
import styles from "./GridItem.module.css";

type GridItemProps = {
  posterUrl: string;
  backdropUrl: string;
  title: string;
  date?: string;
  isSelected: boolean;
  inFavorites?: boolean;
  toggleFavourite?: () => void;
  onSelect: () => void;
};

export function GridItem({
  posterUrl,
  backdropUrl,
  date,
  title,
  isSelected,
  inFavorites = false,
  toggleFavourite = () => {},
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
      {isSelected ? (
        <img src={backdropUrl} alt={title} className={styles.movieBackdrop} />
      ) : (
        <img src={posterUrl} alt={title} className={styles.movieImage} />
      )}

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
          <FavouriteButton
            selected={isSelected}
            inFavorites={inFavorites}
            toggleFavourite={toggleFavourite}
          />
        </div>
      </div>
    </div>
  );
}

import { forwardRef, useState, memo } from "react";
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

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      posterUrl,
      backdropUrl,
      date,
      title,
      isSelected,
      inFavorites = false,
      toggleFavourite = () => {},
      onSelect,
    },
    ref
  ) => {
    const [isImageBroken, setIsImageBroken] = useState(false);
    if (!date || !title || isImageBroken) {
      return null;
    }
    const formattedDate = formatDate(date);
    const selectedMode = isSelected ? styles.selected : "";

    const handleImageError = () => {
      setIsImageBroken(true);
    };
    return (
      <div
        ref={ref}
        className={[styles.movieCard, selectedMode].join(" ")}
        onClick={onSelect}
        data-testid="grid-item"
      >
        {isSelected ? (
          <img
            src={backdropUrl}
            alt={title}
            className={styles.movieBackdrop}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <img
            src={posterUrl}
            alt={title}
            className={styles.movieImage}
            onError={handleImageError}
            loading="lazy"
          />
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
);
export default memo(GridItem);

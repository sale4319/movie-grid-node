import { useState } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

import styles from "./FavouriteButton.module.css";

type FavouriteButtonProps = { selected: boolean };

export function FavouriteButton({ selected }: FavouriteButtonProps) {
  const [inFavorites, setInFavorites] = useState(false);

  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInFavorites(!inFavorites);
  };

  const selectedMode = selected ? styles.selected : "";

  return (
    <button className={styles.favoriteButton} onClick={handleFavourite}>
      {inFavorites ? (
        <StarIcon className={[styles.iconColor, selectedMode].join(" ")} />
      ) : (
        <StarOutlineIcon
          className={[styles.iconColor, selectedMode].join(" ")}
        />
      )}
    </button>
  );
}

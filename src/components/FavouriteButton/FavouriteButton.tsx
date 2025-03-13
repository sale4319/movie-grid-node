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

  if (inFavorites) {
    return (
      <StarIcon
        className={[styles.iconColor, selectedMode].join(" ")}
        onClick={handleFavourite}
        data-testid="favourite-icon-filled"
      />
    );
  }

  return (
    <StarOutlineIcon
      className={[styles.iconColor, selectedMode].join(" ")}
      onClick={handleFavourite}
      data-testid="favourite-icon-outlined"
    />
  );
}

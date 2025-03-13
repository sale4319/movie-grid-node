import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

import styles from "./FavouriteButton.module.css";

type FavouriteButtonProps = {
  selected: boolean;
  inFavorites: boolean;
  toggleFavourite: () => void;
};

export function FavouriteButton({
  selected,
  inFavorites,
  toggleFavourite,
}: FavouriteButtonProps) {
  const handleFavourite = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    toggleFavourite();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFavourite(e);
    }
  };

  const selectedMode = selected ? styles.selected : "";

  if (inFavorites) {
    return (
      <StarIcon
        className={[styles.iconColor, selectedMode].join(" ")}
        onClick={handleFavourite}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        data-testid="favourite-icon-filled"
      />
    );
  }

  return (
    <StarOutlineIcon
      className={[styles.iconColor, selectedMode].join(" ")}
      onClick={handleFavourite}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-testid="favourite-icon-outlined"
    />
  );
}

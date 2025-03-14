import styles from "./LoadMoreButton.module.css";

export function LoadMoreButton({
  handleLoadMore,
}: {
  handleLoadMore: () => void;
}) {
  return (
    <div className={styles.loadMore}>
      <button tabIndex={0} onClick={handleLoadMore}>
        Load More...
      </button>
    </div>
  );
}

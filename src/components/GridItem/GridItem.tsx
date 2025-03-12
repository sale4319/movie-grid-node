import styles from "./GridItem.module.css";

type GridItemProps = {
  posterUrl: string;
  title: string;
  date?: string;
  key: number;
};

export function GridItem({ posterUrl, date, title, key }: GridItemProps) {
  return (
    <div className={styles.gridContainer}>
      <div key={key} className={styles.gridItem}>
        <img src={posterUrl} alt={title} />
        <h3>{title}</h3>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
}

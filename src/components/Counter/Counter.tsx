import styles from './Counter.module.css';

function Counter() {
  return (
    <div className={styles.counterContainer}>
      <span className={styles.countDisplay}>{count}</span>
      <div className={styles.buttonGroup}>
        <button className={styles.button}>Increment</button>
      </div>
    </div>
  );
}

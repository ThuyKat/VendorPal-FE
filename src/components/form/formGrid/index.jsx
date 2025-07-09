import styles from './formGrid.module.css';
export default function formGrid({ children }) {
  return (
      <div className={styles.formGrid}>
        {children}
      </div>
  );
}
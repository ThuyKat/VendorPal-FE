import styles from './gridList.module.css';
import clsx from 'clsx'
export default function GridList({ 
  children, 
  className = "", 
}) {
  const gridStyles = clsx(styles.grid, className);
  
  return (
    <div className={styles.container}>
      <div 
        className={gridStyles}
      >
        {children}
      </div>
    </div>
  );
}
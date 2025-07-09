import styles from './formSection.module.css';
export default function FormSection({ children }) {
  return (
    <div className={styles.formSection}>
            {children}
    </div>
  );
}
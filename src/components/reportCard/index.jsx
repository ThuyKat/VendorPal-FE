import styles from './reportCard.module.css';
import Button from '../../components/button';

export default function ReportCard({ title,description,icon,color }) {

  return (
    <div className={styles.reportCard}>
        <div className={`${styles.iconContainer} ${styles[color]}`}>
            {icon} 
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <Button className={styles.generateButton} incon={icon}>
            Generate Report →
        </Button>
    </div>
  )
  }  


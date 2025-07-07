/* 
@param {'low-stock'|'all-cover'|'trend-up'|'trend-down'|''} [message=''] - Message type
*/
import styles from './statCard.module.css';
import clsx from 'clsx'
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
export default function StatCard({ label, value, icon, isTrend=false, message="",messageType, iconColor, className = '' }) {
   const iconStyle = clsx(styles.statsCard, className)
   const iconColorClass = `icon-${iconColor || 'default'}`;
   const footerTextStyle = `${messageType}-text`
    return (
       
      <div className={iconStyle}>
        <div className={styles.statsContent}>
          <div>
            <p className={styles.statsLabel}>{label}</p>
            <p className={styles.statsValue}>
              {value}
            </p>
          </div>

          <div className={`${styles.statsIcon} ${styles[iconColorClass]}`}>
            {icon}
          </div>

        </div>

        <div className={styles.statsFooter}>
          {isTrend?(messageType=='trend-up'? <MdTrendingUp className={styles["trend-up-icon"]} />: <MdTrendingDown className={styles["trend-down-icon"]}/>): null}
          <span className={styles[footerTextStyle]}>
            {message}
          </span>
        </div>

      </div>

    );
}
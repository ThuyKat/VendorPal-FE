import { 
  HiTrendingUp, 
  HiCube, 
  HiUsers, 
  HiChartBar, 
  HiCurrencyDollar, 
  HiShoppingCart 
} from 'react-icons/hi';
import styles from './reports.module.css';
import ReportCard from '../../../components/reportCard';

export default function Reports() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>

        <ReportCard
          title="Sales Report"
          description="Daily, weekly, monthly sales analysis"
          icon={<HiTrendingUp className={styles.icon} />}
          color="blue"
        />
        <ReportCard
          title="Inventory Report"
          description="Stock levels and product performance"
          icon={<HiCube className={styles.icon} />}
          color="green"
        />
        <ReportCard
          title="Staff Performance"
          description="Employee productivity and hours"
          icon={<HiUsers className={styles.icon} />}
          color="purple"
        />
        <ReportCard
          title="Customer Analytics"
          description="Customer behavior and preferences"
          icon={<HiChartBar className={styles.icon} />}
          color="orange"
        />
        <ReportCard
          title="Financial Summary"
          description="Revenue, expenses, and profit margins"
          icon={<HiCurrencyDollar className={styles.icon} />}
          color="red"
        />
        <ReportCard
          title="Order Analytics"
          description="Order patterns and fulfillment metrics"
          icon={<HiShoppingCart className={styles.icon} />}
          color="indigo"
        />  
      </div>
    </div>
  );
}
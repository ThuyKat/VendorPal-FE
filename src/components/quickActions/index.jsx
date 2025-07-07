import styles from './quickActions.module.css';
import { MdAdd, MdPersonAdd, MdBarChart, MdMonitor } from 'react-icons/md';
import Button from '../button';
import { useContext } from 'react';
import { AdminLayoutContext } from '../../pages/admin/index'; 
export default function QuickActions({ actions, className = '' }) {
    const {handleViewChange} = useContext(AdminLayoutContext);
    return (
        <div className={styles.actionsGrid}>
              <Button className={styles.actionButton} icon={<MdAdd className={styles.actionIcon} />} >
                <span className={styles.actionLabel}>Add Product</span>
              </Button>
              <Button className={styles.actionButton} icon={<MdPersonAdd className={styles.actionIcon} />} >
                <span className={styles.actionLabel}>Add Staff</span>
              </Button>
              <Button className={styles.actionButton} icon={<MdBarChart className={styles.actionIcon} />} >
                <span className={styles.actionLabel}>View Reports</span>
              </Button>
              <Button
                onClick={() => handleViewChange('pos')}
                className={styles.actionButton}
                icon={<MdMonitor className={styles.actionIcon} />}
              >
                <span className={styles.actionLabel}>Open POS</span>
              </Button>
        </div>
    );
}
import { 
  MdAttachMoney, 
  MdTrendingUp, 
  MdShoppingCart, 
  MdInventory, 
  MdPeople, 
  MdAdd, 
  MdBarChart, 
  MdMonitor,
  MdAccessTime,
  MdCheckCircle,
  MdError,
  MdPersonAdd
} from 'react-icons/md';
import styles from './dashboard.module.css';
import StatCard from '../../../components/statCard';
import OrderListCard from '../../../components/orderListCard';
import QuickActions from '../../../components/quickActions';
export default function Dashboard() {
  // Sample data
  const dashboardStats = {
    todaysSales: 12547,
    totalOrders: 156,
    pendingOrders: 12,
    totalProducts: 1247,
    lowStock: 23,
    onlineStaff: 8,
    totalStaff: 12
  };

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Smith', amount: 125.99, time: '2 min ago', status: 'completed' },
    { id: 'ORD-002', customer: 'Sarah Wilson', amount: 89.50, time: '5 min ago', status: 'processing' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: 234.75, time: '8 min ago', status: 'pending' },
    { id: 'ORD-004', customer: 'Emily Brown', amount: 67.25, time: '12 min ago', status: 'completed' },
    { id: 'ORD-005', customer: 'David Lee', amount: 156.80, time: '15 min ago', status: 'processing' }
  ];

  return (
    <div className={styles.dashboard}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard
            label="Today's Sales"
            value={`$${dashboardStats.todaysSales.toLocaleString()}`}
            icon={<MdAttachMoney className={styles.icon} />}
            isTrend={true}
            messageType="trend-up"
            message="+12.5% from yesterday"
            iconColor="green"
          />
        <StatCard
            label="Total Orders"
            value={dashboardStats.totalOrders}
            icon={<MdShoppingCart className={styles.icon} />}
            isTrend={false}
            messageType="pending"
            message={`${dashboardStats.pendingOrders} pending`}
            iconColor="blue"
          />

        <StatCard
            label="Total Products"
            value={dashboardStats.totalProducts}
            icon={<MdInventory className={styles.icon} />}
            isTrend={false}
            messageType="low-stock"
            message={`${dashboardStats.lowStock} low stock`}
            iconColor="purple"
          />
        <StatCard
            label="Staff Online"
            value={`${dashboardStats.onlineStaff}/${dashboardStats.totalStaff}`}
            icon={<MdPeople className={styles.icon} />}
            isTrend={false}
            messageType="all-covered"
            message="All shifts covered"
            iconColor="orange"
          />
      </div>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Recent Orders */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Recent Orders</h3>
          </div>
          <div className={styles.sectionContent}>
            <OrderListCard orders={recentOrders} maxItems={4}/>
        </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Quick Actions</h3>
          </div>
          <div className={styles.sectionContent}>
            <QuickActions/>
          </div>
        </div>
      </div>
    </div>
  );
}
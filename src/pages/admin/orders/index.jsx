import { FiFilter, FiDownload, FiPlus, FiEye, FiEdit } from 'react-icons/fi';
import styles from './Orders.module.css';
import Button from '../../../components/button';
import Table from '../../../components/dataTable';
import SearchBar from '../../../components/searchBar';
import { useFetch } from '../../../hooks/useFetch';
import { formatDistanceToNow } from 'date-fns';
export default function Orders({ orders = [], onFilter, onExport, onNewOrder, onViewOrder, onEditOrder }) {
  // Fetch orders data
  const {data:response,loadingOrders, errorOrders} = useFetch('/tenant/orders');
  const formatedOrders =  response?.data.map((order, index) => ({
  id: `ORD-${String(order.id).padStart(3, '0')}`, // e.g., ORD-001
  customer: order.customerName,
  amount: order.total,
  time: formatDistanceToNow(new Date(order.createdAt), { addSuffix: true }), // e.g., "2 min ago"
  status: order.status,
}));
  // Handle search functionality
  const handleSearch = (searchTerm) => {
            console.log("Search Term:", searchTerm);
            // search functionality here
        };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.actionButtons}>
          <Button className={styles.filterButton} onClick={onFilter} icon={<FiFilter className={styles.icon} />}>
            <span>Filter</span>
          </Button>
          <Button className={styles.exportButton} onClick={onExport} icon={<FiDownload className={styles.icon} />}>
            <span>Export</span>
          </Button>
        </div>
        <SearchBar onChange={handleSearch}/>
        
        {/* <Button className={styles.newOrderButton} onClick={onNewOrder} icon={<FiPlus className={styles.icon} />}>
          <span>New Order</span>
        </Button> */}
      </div>

      <Table
            data={formatedOrders}
            dataTypes={{
            id: 'text',
            customer: 'text',
            amount: 'currency',
            status: 'status',
            time: 'text'
            }}
            actions={['view', 'edit', 'delete']}
            onAction={(action, row) => {
            if (action === 'view') onViewOrder && onViewOrder(row.id);
            if (action === 'edit') onEditOrder && onEditOrder(row.id);
            }}
        />


    </div>
  );
};
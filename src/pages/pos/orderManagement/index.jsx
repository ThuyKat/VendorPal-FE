// OrderManagement.jsx
import styles from './OrderManagement.module.css';
import React from 'react';
import { POSContext } from '../index';
import Button from '../../../components/button';
import OrderCard from '../orderCard';
import GridList from '../../../components/gridList';
export default function OrderManagement({orders = []}) {
//state
    const [orderFilter, setOrderFilter] = React.useState('all');
    const {setCurrentModal, setModalData,handleResumeOrder} = React.useContext(POSContext);

//handlers
    const handleDeleteOrder = (order) => {
      setCurrentModal('delete');
      setModalData(order);        
    };
    const handleRefundOrder = (order) => {
      if (order) {
          setCurrentModal('refund');
          setModalData(order);
      }
    }; 
    const handleViewDetail = (order) => {
      setCurrentModal('viewDetail');
      setModalData(order);
    };
    const handlePrintReceipt = (order) => {
      setCurrentModal('printReceipt');
      setModalData(order);
    };
    const handleUpdateOrder = (order) => {
      setCurrentModal('updateOrder');
      setModalData(order);
    };
    
    // Filtered orders based on current filter
    const filteredOrders = orders.filter(order => 
        orderFilter === 'all' ? true : order.status === orderFilter
    );
    function getActionButtons(order) {
        const buttonConfigs = {
            pending: [
            { text: 'Resume & Pay', style: "resumeButton", onClick: () => handleResumeOrder(order.id) },
            { text: 'Delete', style: "deleteButton", onClick: () => handleDeleteOrder(order) }
            ],
            active: [
            { text: 'View Details', style: "viewButton" , onClick: () => handleViewDetail(order) },
            { text: 'Update Status', style: "updateButton", onClick: () => handleUpdateOrder(order) },
            { text: 'Cancel', style: "cancelButton", onClick: () => handleRefundOrder(order) }
            ],
            completed: [
            { text: 'Print Receipt', style: "printButton", onClick: () => handlePrintReceipt(order) },
            { text: 'Refund', style: "refundButton", onClick: () => handleRefundOrder(order) }
            ],
            cancelled: [
            { text: 'View Details', style: "viewDetailsButton", onClick: () => handleViewDetail(order) },
            { text: 'Reorder', style: "reorderButton", onClick: () => handleResumeOrder(order.id) }
            ]
        };
  
        return buttonConfigs[order.status] || [];
    }
    
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Order Management</h2>
        
        {/* Order Filter */}
        <div className={styles.filterContainer}>
          <Button
            onClick={() => setOrderFilter('all')}
            className={`${styles.filterButton} ${
              orderFilter === 'all' ? styles.activeFilter : styles.inactiveFilter
            }`}
          >
            All({orders.length})
          </Button>
          <Button
            onClick={() => setOrderFilter('pending')}
            className={`${styles.filterButton} ${
              orderFilter === 'pending' ? styles.activeFilter : styles.inactiveFilter
            }`}
          >
            Pending ({orders.filter(o => o.status === 'pending').length})
          </Button>
          <Button
            onClick={() => setOrderFilter('active')}
            className={`${styles.filterButton} ${
              orderFilter === 'active' ? styles.activeFilter : styles.inactiveFilter
            }`}
          >
            Active ({orders.filter(o => o.status === 'active').length})
          </Button>
          <Button
            onClick={() => setOrderFilter('completed')}
            className={`${styles.filterButton} ${
              orderFilter === 'completed' ? styles.activeFilter : styles.inactiveFilter
            }`}
          >
            Completed ({orders.filter(o => o.status === 'completed').length})
          </Button>
          <Button
            onClick={() => setOrderFilter('cancelled')}
            className={`${styles.filterButton} ${
              orderFilter === 'cancelled' ? styles.activeFilter : styles.inactiveFilter
            }`}
          >
            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
          </Button>
        </div>
      </div>

      {/* Orders List */}
      {/* <div className={styles.ordersList}> */}
      <GridList className={styles.ordersList}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No {orderFilter === 'all' ? '' : orderFilter.toLowerCase()} orders found</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              getActionButtons={getActionButtons}
            />
          ))
        )}
      </GridList>
    </>
  );
}
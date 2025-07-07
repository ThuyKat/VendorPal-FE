import { MdCheckCircle, MdAccessTime, MdError } from 'react-icons/md';
import styles from './orderListCard.module.css';
export default function OrderListCard({ orders,maxItems=null,className='' }) {
    
    const getStatusColor = (status) => {
    switch (status) {
        case 'completed':
        return styles.statusCompleted;
        case 'processing':
        return styles.statusProcessing;
        case 'pending':
        return styles.statusPending;
        default:
        return styles.statusDefault;
    }
    };

    const getStatusIcon = (status) => {
    switch (status) {
        case 'completed':
        return <MdCheckCircle className={styles.statusIcon} />;
        case 'processing':
        return <MdAccessTime className={styles.statusIcon} />;
        case 'pending':
        return <MdError className={styles.statusIcon} />;
        default:
        return <MdAccessTime className={styles.statusIcon} />;
    }
    };
    return(
         <div className={styles.orderListContainer}>
            <div className={styles.ordersList}>
                {orders.map((order,index) => (
                    // Limit the number of displayed orders if maxItems is set
                    maxItems && index >= maxItems ? null :
                    (<div key={order.id} className={styles.orderItem}>
                        <div className={styles.orderLeft}>
                        <div className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                        </div>
                        <div>
                            <p className={styles.orderId}>{order.id}</p>
                            <p className={styles.customerName}>{order.customer}</p>
                        </div>
                        </div>
                        <div className={styles.orderRight}>
                        <p className={styles.orderAmount}>${order.amount}</p>
                        <p className={styles.orderTime}>{order.time}</p>
                        </div>
                    </div>)
                ))}

            </div>
            <button className={styles.viewAllButton}>
                View All Orders
            </button>
        </div>
       
    )
}
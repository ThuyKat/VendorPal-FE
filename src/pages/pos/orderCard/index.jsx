import DataType from '../../../components/dataType';
import Button from '../../../components/button';
import styles from './orderCard.module.css';

export default function OrderCard({order, getActionButtons = () => []}) {
    const actionButtons = getActionButtons(order);
    return(
        <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
                <div>
                    <div className={styles.orderTitleRow}>
                        <h3 className={styles.orderTitle}>Order #{order.id}</h3>
                        <div className={styles.badgeContainer}>
                            <DataType 
                                variant="status"
                                value={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                className={styles.badge}
                            />
                            <DataType
                                variant="status"
                                value={order.substatus.replace(/_/g, ' ')}
                                className={styles.badge}
                            />
                        </div>
                    </div>
                    <p className={styles.customerName}>
                        {order.customerName || 'No customer name'}
                    </p>
                    <p className={styles.orderTime}>
                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                </div>
                <div className={styles.orderTotal}>
                    <p className={styles.totalAmount}>${order.total.toFixed(2)}</p>
                    {order.paymentMethod && (
                        <p className={styles.paymentMethod}>{order.paymentMethod}</p>
                    )}
                </div>
            </div>

            {/* Order Items */}
            <div className={styles.orderItems}>
                {order.items.map(item => (
                    <div key={item.id} className={styles.orderItem}>
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                {order.notes && (
                    <p className={styles.orderNotes}>Note: {order.notes}</p>
                )}
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
                {actionButtons.map((buttonConfig, index) => (
                    <Button
                        key={index}
                        onClick={buttonConfig.onClick}
                        className={`${styles.actionButton} ${styles[buttonConfig.style]}`}
                    >
                        {buttonConfig.text}

                    </Button>
                ))}
            </div>
        </div>
    )
}
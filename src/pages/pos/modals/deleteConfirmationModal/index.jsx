import { MdClose } from 'react-icons/md';
import styles from './deleteConfirmationModal.module.css';
import Button from '../../../../components/button';
export default function DeleteConfirmationModal({ order, onClose, onConfirm }) {
  return (
    <div className={styles.modalContent}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <MdClose className={styles.icon} />
          </div>
          <div>
            <h2 className={styles.title}>Delete Order</h2>
            <p className={styles.subtitle}>This action cannot be undone</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.orderInfo}>
            <h3 className={styles.orderTitle}>Order #{order.id}</h3>
            <p className={styles.orderDetail}>
              Customer: {order.customerName || 'No customer name'}
            </p>
            <p className={styles.orderDetail}>
              Total: ${order.total.toFixed(2)}
            </p>
            <p className={styles.orderDetail}>
              Status: {order.status}
            </p>
          </div>

          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              <strong>Warning:</strong> This will permanently remove the order from the system. 
              This action is only available for pending orders that haven't been paid.
            </p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className={styles.deleteButton}>
            Delete Order
          </Button>
        </div>
      </div>
    </div>
  );
}

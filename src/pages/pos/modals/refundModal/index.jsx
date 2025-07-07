import { useState } from 'react';
import { MdAttachMoney, MdClose } from 'react-icons/md';
import Button from '../../../../components/button';
import styles from './RefundModal.module.css';

export default function RefundModal({ order, onClose, onRefund }) {
  const [refundAmount, setRefundAmount] = useState(order.total.toString());
  const [refundReason, setRefundReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefund = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const refundData = {
      orderId: order.id,
      amount: parseFloat(refundAmount),
      reason: refundReason,
      timestamp: new Date().toISOString()
    };
    
    onRefund(refundData);
    setIsLoading(false);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.iconContainer}>
              <MdAttachMoney className={styles.icon} />
            </div>
            <h2 className={styles.title}>Process Refund</h2>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <MdClose className={styles.closeIcon} />
          </button>
        </div>

        {/* Order Details */}
        <div className={styles.orderDetails}>
          <h3 className={styles.orderTitle}>Order #{order.id}</h3>
          <div className={styles.orderInfo}>
            <div className={styles.orderRow}>
              <span>Customer:</span>
              <span>{order.customerName || 'No customer name'}</span>
            </div>
            <div className={styles.orderRow}>
              <span>Original Amount:</span>
              <span className={styles.amount}>${order.total.toFixed(2)}</span>
            </div>
            <div className={styles.orderRow}>
              <span>Payment Method:</span>
              <span className={styles.paymentMethod}>{order.paymentMethod}</span>
            </div>
            <div className={styles.orderRow}>
              <span>Date:</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Refund Form */}
        <div className={styles.refundForm}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Refund Amount
            </label>
            <input
              type="number"
              step="0.01"
              max={order.total}
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              className={styles.numberInput}
            />
            <p className={styles.helpText}>
              Maximum refund: ${order.total.toFixed(2)}
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Reason for Refund
            </label>
            <select
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className={styles.select}
            >
              <option value="">Select a reason</option>
              <option value="customer_request">Customer Request</option>
              <option value="item_defective">Item Defective</option>
              <option value="wrong_order">Wrong Order</option>
              <option value="service_issue">Service Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Refund Warning */}
        <div className={styles.warningBox}>
          <p className={styles.warningText}>
            <strong>Note:</strong> This will process a refund for ${parseFloat(refundAmount || 0).toFixed(2)} 
            to the original payment method. This action cannot be undone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <Button
            onClick={onClose}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRefund}
            disabled={isLoading || !refundAmount || !refundReason || parseFloat(refundAmount) > order.total}
            className={styles.refundButton}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Processing...
              </>
            ) : (
              'Process Refund'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
// SaveOrderModal.jsx
import { useState } from 'react';
import { MdSave, MdClose, MdPerson, MdDescription } from 'react-icons/md';
import styles from './saveOrderModal.module.css';

export default function SaveOrderModal({ cart, total, onClose, onSave }) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const orderData = {
      customerName: customerName.trim() || null,
      phoneNumber: phoneNumber.trim() || null,
      notes: notes.trim() || null
    };
    
    onSave(orderData);
    setIsLoading(false);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <MdSave className={styles.titleIcon} />
            <h2 className={styles.title}>Save Order</h2>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <MdClose className={styles.closeIcon} />
          </button>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Information */}
        <div className={styles.customerForm}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <MdPerson className={styles.labelIcon} />
              Customer Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <MdDescription className={styles.labelIcon} />
              Order Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes"
              rows={3}
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Save Information */}
        <div className={styles.infoBox}>
          <h4 className={styles.infoTitle}>What happens when you save?</h4>
          <ul className={styles.infoList}>
            <li>• Order will be saved with status "PENDING"</li>
            <li>• Cart will be cleared for next customer</li>
            <li>• You can retrieve this order later to complete payment</li>
            <li>• Order will appear in the saved orders list</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button
            onClick={onClose}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={styles.saveButton}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Saving...
              </>
            ) : (
              'Save Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
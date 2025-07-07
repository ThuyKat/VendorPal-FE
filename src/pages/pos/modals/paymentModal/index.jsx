import React, { useState } from 'react';
import { 
  IoClose, 
  IoArrowBack, 
  IoCheckmark,
  IoCard,
  IoPhonePortrait 
} from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import styles from './PaymentModal.module.css';

export default function PaymentModal({ cart, total, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState('payment-method');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cashReceived, setCashReceived] = useState('');

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setCurrentStep('payment-process');
  };

  const handlePaymentComplete = () => {
    setCurrentStep('success');
    setTimeout(() => {
      onComplete({
        method: selectedPaymentMethod,
        amount: total,
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  const change = cashReceived ? Math.max(0, parseFloat(cashReceived) - total) : 0;

  return (
      <>
        
        {/* Payment Method Selection */}
        {currentStep === 'payment-method' && (
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>Select Payment Method</h2>
              <button onClick={onClose} className={styles.closeButton}>
                <IoClose size={20} />
              </button>
            </div>

            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className={styles.summaryTotal}>
                <span>Total:</span>
                <span className={styles.totalAmount}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.paymentMethods}>
              <button
                onClick={() => handlePaymentMethodSelect('paypal')}
                className={`${styles.paymentButton} ${styles.paypalButton}`}
              >
                <IoPhonePortrait className={styles.paymentIcon} size={24} />
                <span className={styles.paymentText}>PayPal QR Code</span>
              </button>

              <button
                onClick={() => handlePaymentMethodSelect('cash')}
                className={`${styles.paymentButton} ${styles.cashButton}`}
              >
                <FaDollarSign className={styles.paymentIcon} size={24} />
                <span className={styles.paymentText}>Cash Payment</span>
              </button>

              <button
                onClick={() => handlePaymentMethodSelect('card')}
                className={`${styles.paymentButton} ${styles.cardButton}`}
              >
                <IoCard className={styles.paymentIcon} size={24} />
                <span className={styles.paymentText}>Credit/Debit Card</span>
              </button>
            </div>
          </div>
        )}

        {/* PayPal Payment Process */}
        {currentStep === 'payment-process' && selectedPaymentMethod === 'paypal' && (
          <div className={styles.content}>
            <div className={styles.headerWithBack}>
              <button 
                onClick={() => setCurrentStep('payment-method')} 
                className={styles.backButton}
              >
                <IoArrowBack size={20} />
              </button>
              <h2 className={styles.title}>PayPal Payment</h2>
              <button onClick={onClose} className={styles.closeButton}>
                <IoClose size={20} />
              </button>
            </div>

            <div className={styles.paypalSection}>
              <div className={styles.qrContainer}>
                <div className={styles.qrCode}>
                  <span className={styles.qrText}>QR CODE</span>
                </div>
                <p className={styles.qrLabel}>Scan to pay ${total.toFixed(2)}</p>
              </div>
              <p className={styles.totalDisplay}>Total: ${total.toFixed(2)}</p>
              <p className={styles.instruction}>Customer scans QR code with PayPal app</p>
            </div>

            <button
              onClick={handlePaymentComplete}
              className={`${styles.completeButton} ${styles.paypalComplete}`}
            >
              Payment Received
            </button>
          </div>
        )}

        {/* Card Payment Process */}
        {currentStep === 'payment-process' && selectedPaymentMethod === 'card' && (
          <div className={styles.content}>
            <div className={styles.headerWithBack}>
              <button 
                onClick={() => setCurrentStep('payment-method')} 
                className={styles.backButton}
              >
                <IoArrowBack size={20} />
              </button>
              <h2 className={styles.title}>Card Payment</h2>
              <button onClick={onClose} className={styles.closeButton}>
                <IoClose size={20} />
              </button>
            </div>

            <div className={styles.cardSection}>
              <div className={styles.cardTotal}>
                <p className={styles.totalDisplay}>Total: ${total.toFixed(2)}</p>
              </div>

              <div className={styles.cardProcess}>
                <IoCard className={styles.cardIcon} size={48} />
                <h3 className={styles.cardTitle}>Insert or Tap Card</h3>
                <p className={styles.cardInstruction}>Please insert chip card or tap contactless payment</p>
                <div className={styles.loadingDots}>
                  <div className={`${styles.dot} ${styles.dot1}`}></div>
                  <div className={`${styles.dot} ${styles.dot2}`}></div>
                  <div className={`${styles.dot} ${styles.dot3}`}></div>
                </div>
                <p className={styles.waitingText}>Waiting for card...</p>
              </div>

              <button
                onClick={handlePaymentComplete}
                className={`${styles.completeButton} ${styles.cardComplete}`}
              >
                Payment Successful
              </button>
            </div>
          </div>
        )}

        {/* Cash Payment Process */}
        {currentStep === 'payment-process' && selectedPaymentMethod === 'cash' && (
          <div className={styles.content}>
            <div className={styles.headerWithBack}>
              <button 
                onClick={() => setCurrentStep('payment-method')} 
                className={styles.backButton}
              >
                <IoArrowBack size={20} />
              </button>
              <h2 className={styles.title}>Cash Payment</h2>
              <button onClick={onClose} className={styles.closeButton}>
                <IoClose size={20} />
              </button>
            </div>

            <div className={styles.cashSection}>
              <div className={styles.cashTotal}>
                <p className={styles.totalDisplay}>Total Due: ${total.toFixed(2)}</p>
              </div>

              <div className={styles.cashInput}>
                <label className={styles.inputLabel}>Cash Received:</label>
                <input
                  type="number"
                  step="0.01"
                  min={total}
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder={total.toFixed(2)}
                  className={styles.cashInputField}
                />
              </div>

              <div className={styles.changeDisplay}>
                <div className={styles.changeRow}>
                  <span className={styles.changeLabel}>Change Due:</span>
                  <span className={`${styles.changeAmount} ${change >= 0 ? styles.positiveChange : styles.negativeChange}`}>
                    ${change.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePaymentComplete}
                disabled={!cashReceived || parseFloat(cashReceived) < total}
                className={`${styles.completeButton} ${styles.cashComplete}`}
              >
                Complete Cash Payment
              </button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {currentStep === 'success' && (
          <div className={`${styles.content} ${styles.successContent}`}>
            <div className={styles.successIcon}>
              <IoCheckmark size={32} />
            </div>
            <h2 className={styles.successTitle}>Payment Successful!</h2>
            <p className={styles.successMessage}>Transaction completed successfully</p>
            <div className={styles.successDetails}>
              <p className={styles.successDetail}>Amount: ${total.toFixed(2)}</p>
              <p className={styles.successDetail}>Method: {selectedPaymentMethod}</p>
            </div>
            <p className={styles.returnMessage}>Returning to POS...</p>
          </div>
        )}
    </>
  );
}
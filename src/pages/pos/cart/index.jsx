import React from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import styles from './cart.module.css';
import { POSContext } from '../index';
import Button from '../../../components/button';
import CartItem from '../cartItem';
export default function Cart(){
    const { cart,setCart,setCurrentModal} = React.useContext(POSContext);
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const tax = subtotal * 0.1; // 8% tax rate
    const total = subtotal + tax;

    const handleProcessPayment = () => {
        if (cart.length === 0) {
        alert('Cart is empty!');
        return;
        }
        // Open payment modal
        setCurrentModal('payment');
        setCart([]); // Clear cart after payment
    };

    const handleSaveOrder = () => {
        if (cart.length === 0) {
        alert('Cart is empty!');
        return;
        }
        setCurrentModal('saveOrder');
    };
    return(
        <div className={styles.cartPanel}>
            <div className={styles.cartHeader}>
                <h3 className={styles.cartTitle}>Current Order</h3>
            </div>

            <div className={styles.cartContent}>
            {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                <HiShoppingCart className={styles.emptyCartIcon} />
                <p className={styles.emptyCartText}>No items in cart</p>
                <p className={styles.emptyCartSubtext}>Tap products to add them</p>
                </div>
            ) : (
                <div className={styles.cartItems}>
                {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
                </div>
            )}
            </div>

            <div className={styles.cartFooter}>
            <div className={styles.totals}>
                <div className={styles.totalRow}>
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.totalRowFinal}>
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <div className={styles.actionButtons}>
                <Button
                onClick={handleProcessPayment}
                className={styles.processButton}
                >
                Process Payment
                </Button>
                <Button
                onClick={handleSaveOrder}
                className={styles.saveButton}
                >
                Save Order
                </Button>
                <Button
                onClick={() => setCart([])}
                className={styles.clearButton}
                >
                Clear Cart
                </Button>
            </div>
            </div>
        </div>
    )
}
import React from 'react';
import styles from './cartItem.module.css';
import { POSContext } from '../index';
import Button from '../../../components/button';
export default function CartItem({ item }) {
    //state
    const {setCart } = React.useContext(POSContext);
    //handlers
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
        }
        setCart(prevCart =>
        prevCart.map(item =>
            item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
        );
    };
    return (
       <div key={item.id} className={styles.cartItem}>
            <div className={styles.cartItemInfo}>
                <h4 className={styles.cartItemName}>{item.name}</h4>
                <p className={styles.cartItemPrice}>${item.price}</p>
            </div>
            <div className={styles.cartItemControls}>
                <Button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className={styles.quantityButton}
                >
                -
                </Button>
                <span className={styles.quantity}>{item.quantity}</span>
                <Button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className={styles.quantityButton}
                >
                +
                </Button>
            </div>
        </div>
    );
}
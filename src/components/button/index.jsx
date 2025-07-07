import clsx from 'clsx';
import styles from './button.module.css';
import React from 'react';
function Button({ onClick, type='button', variant = '',shape = '',className='', icon = null, children,...rest},ref ) {
    const btnStyles = clsx(
        styles.btn,
        styles[`btn--${variant}`],
        styles[`btn--${shape}`],
        className
    )
    return (
        <button type ={type} className={btnStyles} onClick={onClick} ref={ref} {...rest}>
            {icon && <span className={styles['btn-icon']}>{icon}</span>}  
            {children}
        </button>
    );
}
export default React.forwardRef(Button);
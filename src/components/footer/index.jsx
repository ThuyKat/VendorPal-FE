import styles from './footer.module.css';
export default function Footer() {
    return(
        <footer className={styles.footer} >
            &copy; {new Date().getFullYear()} VendorPal. All rights reserved.
        </footer>
    )
}
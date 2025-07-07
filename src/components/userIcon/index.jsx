import styles from './userIcon.module.css';
export default function UserIcon({ userName="Admin", userInitial="A"}) {
    return (
        <div className={styles["user-info"]}>
            <div className={styles.avatar}>
                <span className={styles["avatar-text"]}>{userInitial}</span>
            </div>
            <span className={styles["user-name"]}>{userName}</span>
        </div>
    );
}
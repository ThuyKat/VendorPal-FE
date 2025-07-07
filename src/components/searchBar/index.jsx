import clsx from 'clsx';
import styles from './searchBar.module.css';
import { CiSearch } from "react-icons/ci";
export default function SearchBar({ placeholder = 'Search...',onChange=()=>{}, className = '' }) {
    const searchBarStyles = clsx(styles['search-container'], className);
    return (
        <div className={searchBarStyles}>
            <CiSearch className={styles['search-icon']} />
            <input
                type="text"
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onChange(e.target.value);
                    }
                }}
                // value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                className={styles["search-input"]}
            />
        </div>
        
    );
}
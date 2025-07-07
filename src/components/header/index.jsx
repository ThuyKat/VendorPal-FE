import styles from "./header.module.css";

import clsx from "clsx"

export default function Header({pageTitle,children,className="",headerRight=[],headerLeft=[]}) {
    const stylesCombined = clsx(styles.header, className);
    return(
        <div className={stylesCombined}>
             <div className={styles['header-left']}> 
                {pageTitle &&<h1 className={styles["page-title"]}>{pageTitle}</h1>}
                {headerLeft}
            </div>
            <div className={styles['header-center']}>
                {children}
            </div>
            <div className={styles['header-right']}>
               {headerRight}
            </div>
        </div>
    )
}

import Button from '../../../components/button';
import Header from '../../../components/header';
import ProductList from '../productList';
import SearchBar from '../../../components/searchBar';
import styles from './viewPanel.module.css';
import React from 'react';
import { POSContext } from '../index';
import OrderManagement from '../orderManagement';
import logoutUser from '../../../utils/logoutUser';
import { IoMdExit } from "react-icons/io";
export default function ViewPanel({allProducts=[],allOrders=[], onSearch, onClickBack}) {

    const{ currentView, setCurrentView } = React.useContext(POSContext);
   
    return(
        <div className={styles.viewPanel}>
            <div className={styles.viewHeader}>
                <Header 
                className={styles.headerTop} 
                pageTitle="Point of Sale"
                headerRight={[
                <Button onClick={onClickBack} className={styles.backButton} key="back-button">
                    <p >Back to Admin</p>
                </Button>
                ,<Button key="logout" className={styles["logout-btn"]} variant="icon" shape="rounded" icon={<IoMdExit/>} onClick={logoutUser}
                />
                ]}/>
                <div className={styles.toggleContainer}>
                <Button 
                    onClick={() => setCurrentView('products')}
                    className={`${styles.toggleButton} ${
                    currentView === 'products' ? styles.activeButton : styles.inactiveButton
                    }`}
                >
                    Products
                </Button>
                <Button 
                    onClick={() => setCurrentView('orders')}
                    className={`${styles.toggleButton} ${
                    currentView === 'orders' ? styles.activeButton : styles.inactiveButton
                    }`}
                >
                    Orders ({allOrders.length})
                </Button>
                </div>
                <SearchBar className={styles.searchContainer}
                placeholder="Search items..."
                onChange={(value) => onSearch(value)}/>
            </div>
            
            {currentView === "products"?<ProductList products={allProducts}/> : <OrderManagement orders={allOrders}/>}

            
            
        </div>
    )
}
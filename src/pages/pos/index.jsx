
import { useState } from 'react';
import styles from './pos.module.css';
import { useNavigate } from 'react-router-dom'; 
import {createContext} from 'react';
import ViewPanel from './viewPanel';
import Cart from './cart';
import Modal from '../../components/modalWrapper';

import PaymentModal from './modals/paymentModal';
import SaveOrderModal from './modals/saveOrderModal';
import DeleteConfirmationModal from './modals/deleteConfirmationModal';
import RefundModal from './modals/refundModal';
import { useFetch } from '../../hooks/useFetch';


// Create a context for POS state management
const POSContext = createContext({
  cart: [],
  setCart: () => {},currentView: 'products',
  setCurrentView: () => {},
  handleResumeOrder: () => {},
  setCurrentModal: () => {},
  setModalData: () => {},
  closeModal: () => {},
});
export { POSContext };

export default function POSLayout() {
  // Fetch products and orders data
const {data: productsData=[], loading:loadingProducts, errorProducts} = useFetch('/tenant/products')
// replace the below orders with fetched data when available
// const orders = data || [];
// For now, using static orders data for demonstration
// Sample products data 
const products = productsData?.data || [];
// Sample orders data (placeholder)
const {data:ordersData=[], loading:loadingOrders, error:loadingErrors} = useFetch('/tenant/orders')
const orders = ordersData?.data || [];
  // state management
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('products'); // 'products' or 'orders'
  const [currentModal, setCurrentModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  let filteredProducts = products; // Default to all products
  let filteredOrders = orders; // Placeholder for orders, if needed
  // Filter products based on search term if current view is 'products'
  if(currentView =='products') {
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }else{
    filteredOrders = orders.filter(order =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.includes(searchTerm) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  //handler
  const handleBackToAdmin = () => {
    navigate('/admin'); 
  };
  const handleResumeOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setCart(order.items.map(item => ({
        ...item,
        quantity: item.quantity || 1 // Ensure quantity is set
      })));
      setCurrentView('products'); // Switch to products view to edit order
    }
  };
  const closeModal = () => {
      setCurrentModal(null);
      setModalData(null);
  };
  const handlePaymentComplete = () => {
    // Handle payment completion logic here
    setCart([]); // Clear cart after payment
    closeModal() // Close payment modal
  }
  const handleSaveOrder = () => {
    // Handle order saving logic here
    closeModal(); // Close save order modal
  }
  const confirmDeleteOrder = (order) => {
    // Handle order deletion logic here
    // For now, just log the order to be deleted
    console.log('Order deleted:', order);
    closeModal(); // Close delete confirmation modal
  }
  const handleRefund = (order) => {
    // Handle order refund logic here
    console.log('Order refunded:', order);
    closeModal(); // Close refund modal
  }
  const total = (cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0))* 1.1; // Assuming a 10% tax rate for total calculation
     
  return (
    <POSContext.Provider value={{ cart, setCart,currentView, setCurrentView, handleResumeOrder,setCurrentModal ,setModalData}}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <ViewPanel allProducts={filteredProducts} allOrders={filteredOrders} onSearch={setSearchTerm} onClickBack={handleBackToAdmin} />
        </div>
        <div className={styles.rightPanel}>
          <Cart/>
        </div>

      {/*Modal for payment, save order, delete confirmation, and refund*/}
        <Modal isOpen={currentModal !== null} onClose={closeModal}>
            {currentModal === 'payment' && (
            <PaymentModal 
                cart={cart} 
                total={total} 
                onComplete={handlePaymentComplete} 
            />
            )}
            
            {currentModal === 'saveOrder' && (
            <SaveOrderModal 
                cart={cart} 
                total={total} 
                onSave={handleSaveOrder} 
            />
            )}
            
            {currentModal === 'delete' && modalData && (
            <DeleteConfirmationModal 
                order={modalData} 
                onConfirm={confirmDeleteOrder} 
            />
            )}
            
            {currentModal === 'refund' && modalData && (
            <RefundModal 
                order={modalData} 
                onRefund={handleRefund} 
            />
            )}
        </Modal>

      </div>
    </POSContext.Provider>
  );  
}

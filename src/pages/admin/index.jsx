import Layout from "./viewLayout";
import styles from "./admin.module.css";
import AdminSidebar from "./sidebar";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import Modal from '../../components/modalWrapper';
import AddStaffModal from './modals/addStaffModal';
const AdminLayoutContext = React.createContext({
    handleSectionChange: () => {},
    handleViewChange: () => {},
    activeSection: 'dashboard',
    setModalData: () => {},
    setCurrentModal: () => {},
});
export { AdminLayoutContext };
// AdminLayout component that provides the main structure for the admin panel
// It includes the sidebar and the main content area with dynamic page titles
export default function AdminLayout() {
    // Hooks for navigation and location
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get current section from URL
    const currentPath = location.pathname.split('/').pop();
    const [activeSection, setActiveSection] = useState(currentPath || 'dashboard');
    const [currentModal, setCurrentModal] = useState(null);
    const [modalData, setModalData] = useState(null);
    const handleSectionChange = (section) => {
        setActiveSection(section);
        navigate(`/admin/${section}`);
    };

    const handleViewChange = (view) => {
        navigate(`/${view}`);
    };

    const getPageTitle = (section) => {
        const titleMap = {
            'dashboard': 'Dashboard',
            'orders': 'Orders Management',
            'products': 'Products',
            'categories': 'Categories',
            'staff': 'Staff Management',
            'reports': 'Reports & Analytics',
            'settings': 'Settings',
            'pos': 'Point of Sale'
        };
        return titleMap[section] || 'Admin Panel';
    };
    const closeModal = () => {
        setCurrentModal(null);
        setModalData(null);
  };
    const handleAddStaffSubmit = (staffData) => {
        console.log("Staff Data Submitted:", staffData);
        // Logic to handle staff data submission
        closeModal();
    };
    return (
        <AdminLayoutContext.Provider value={{ activeSection, handleSectionChange, handleViewChange,setCurrentModal,setModalData }}>
            <div className={styles["admin-layout"]}>
                <AdminSidebar
                    activeSection={activeSection}
                />
                <Layout 
                    headerProps={{
                        pageTitle: getPageTitle(activeSection)
                    }}
                />
            </div>
            <Modal isOpen={currentModal !== null} onClose={closeModal}>
                {currentModal === 'addStaff' && (
                <AddStaffModal 
                    onClose={closeModal} 
                    onSubmit={handleAddStaffSubmit} 
                />
                )}  
            </Modal>
        </AdminLayoutContext.Provider>
    );
}
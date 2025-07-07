import styles from './sidebar.module.css';
import Header from '../../../components/header';
import { IoClose } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { MdDashboard, MdShoppingCart, MdInventory, MdPeople, MdTrendingUp, MdSettings, MdPointOfSale,MdCategory } from "react-icons/md";
import { useContext, useState } from 'react';
import Button from '../../../components/button';
import { AdminLayoutContext } from '../index'; 
export default function AdminSidebar() {
  const {activeSection,handleSectionChange,handleViewChange} = useContext(AdminLayoutContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", icon: MdDashboard, label: "Dashboard" },
    { id: "orders", icon: MdShoppingCart, label: "Orders" },
    { id: "categories", icon: MdCategory, label: "Categories"},
    { id: "products", icon: MdInventory, label: "Products" },
    { id: "staff", icon: MdPeople, label: "Staff" },
    { id: "reports", icon: MdTrendingUp, label: "Reports" },
    { id: "settings", icon: MdSettings, label: "Settings" },
  ];

  return (
    <div className={`${styles["sidebar"]} ${sidebarOpen ? styles["sidebar-open"] : styles["sidebar-closed"]}`}>
      {/* Header Section */}
      
        <Header className={styles["sidebar-header"]} pageTitle= {sidebarOpen? "VendorPal":null}> 
          <Button 
            className={styles["sidebar-toggle"]} 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            icon={sidebarOpen ? <IoClose /> : <TiThMenu />}
            variant="square"
          />
        </Header>

      {/* Navigation Section : only icon or icon with label */}
      <nav className={styles["sidebar-nav"]}>
        <div className={styles["nav-list"]}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                onClick={() =>handleSectionChange(item.id)}
                className={`${styles["nav-button"]} ${
                  activeSection === item.id ? styles["nav-active"] : styles["nav-inactive"]
                } ${sidebarOpen ? styles["nav-open"] : styles["nav-closed"]}`}
                icon={<IconComponent className={styles["nav-icon"]} />}
              >
                {sidebarOpen && <span className={styles["nav-label"]}>{item.label}</span>}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer Section */}
      <div className={styles["sidebar-footer"]}>
        <Button
          onClick={() => handleViewChange("pos")}
          className={styles["pos-button"]}
          icon={<MdPointOfSale className={styles["nav-icon"]} />}
        >
          {sidebarOpen && <span className={styles["nav-label"]}>Open POS</span>}
        </Button>
      </div>
    </div>
  );
}
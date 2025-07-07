import { HiFilter, HiPlus, HiEye, HiPencil } from 'react-icons/hi';
import styles from './staffs.module.css';
import Table from '../../../components/dataTable';
import Button from '../../../components/button';
import SearchBar from '../../../components/searchBar';
import React from 'react';
import { AdminLayoutContext } from '../index'; 
// Sample staff data - replace with your actual data source
const staff = [
  {
    id: 1,
    name: "John Smith",
    role: "Manager",
    status: "Active",
    shift: "9:00 AM - 5:00 PM"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Cashier",
    status: "Active",
    shift: "2:00 PM - 10:00 PM"
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Sales Associate",
    status: "On Break",
    shift: "10:00 AM - 6:00 PM"
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Supervisor",
    status: "Inactive",
    shift: "8:00 AM - 4:00 PM"
  }
];

export default function Staffs() {

const {setCurrentModal} = React.useContext(AdminLayoutContext);
const handleSearch = (searchTerm) => {
  console.log("Search Term:", searchTerm);
    // search functionality here
};
const openAddStaffModal = () => {
  setCurrentModal('addStaff');
  console.log("Opening Add Staff Modal");
};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Button className={styles.filterButton} icon={<HiFilter className={styles.icon} />}>
            <span>Filter by Role</span>
          </Button>
        </div>
          <SearchBar onChange={handleSearch}/>
        
        <Button className={styles.addButton} icon={<HiPlus className={styles.icon} onClick={openAddStaffModal}  />}>
          <span>Add Staff</span>
        </Button>
      </div>
      
      <Table
        data={staff}
        dataTypes={{
          id: 'text',
          name: 'text',
          role: 'text',
          status: 'status',
          shift: 'text'
        }}
        actions={['view', 'edit']}
        onAction={(action, row) => {
          if (action === 'view') {
            console.log('View staff:', row.id);
          } else if (action === 'edit') {
            console.log('Edit staff:', row.id);
          }
        }}
      />
    </div>
  );
}
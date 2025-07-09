import React, { useState } from 'react';
import { IoClose, IoPerson, IoMail, IoCall, IoShield } from 'react-icons/io5';
import styles from './addStaffModal.module.css';

export default function AddStaffModal({onClose, onSubmit, userRole = 'owner' }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    startDate: '',
    employmentType: 'full_time',
    team: 'floor',
    role: 'staff_level_1',
    pinCode: '',
    permissions: []
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Role-based permission mapping from database
  // hardcoded for demo 
  const rolePermissions = {
    owner: [
      'view_order', 'take_order', 'edit_order', 'request_refund', 
      'manage_category', 'edit_category', 'manage_refund', 'manage_product', 
      'edit_product', 'view_report', 'manage_staff', 'edit_staff', 'access_admin_dashboard'
    ],
    admin: [
      'view_order', 'take_order', 'edit_order', 'request_refund', 
      'edit_category', 'edit_product', 'edit_staff', 'access_admin_dashboard'
    ],
    supervisor: [
      'view_order', 'take_order', 'edit_order', 'request_refund', 
      'manage_refund', 'view_report', 'access_admin_dashboard'
    ],
    staff_level_2: [
      'view_order', 'take_order', 'edit_order', 'request_refund'
    ],
    staff_level_1: [
      'view_order', 'take_order', 'request_refund'
    ]
  };

  // Permission categories for better organization
  const allPermissionCategories = {
    'Order Management': [
      { id: 'view_order', name: 'View Orders', description: 'Can view order details and history' },
      { id: 'take_order', name: 'Take Orders', description: 'Can create new orders for customers' },
      { id: 'edit_order', name: 'Edit Orders', description: 'Can modify existing orders' },
      { id: 'request_refund', name: 'Request Refunds', description: 'Can initiate refund requests' }
    ],
    'Product & Category': [
      { id: 'manage_category', name: 'Manage Categories', description: 'Can create and delete categories' },
      { id: 'edit_category', name: 'Edit Categories', description: 'Can modify category information' },
      { id: 'manage_product', name: 'Manage Products', description: 'Can add and remove products' },
      { id: 'edit_product', name: 'Edit Products', description: 'Can modify product details and pricing' }
    ],
    'Staff Management': [
      { id: 'manage_staff', name: 'Manage Staff', description: 'Can add and remove staff members' },
      { id: 'edit_staff', name: 'Edit Staff', description: 'Can modify staff information and permissions' }
    ],
    'Reports & Admin': [
      { id: 'view_report', name: 'View Reports', description: 'Can access sales and analytics reports' },
      { id: 'manage_refund', name: 'Manage Refunds', description: 'Can approve and process refunds' },
      { id: 'access_admin_dashboard', name: 'Admin Dashboard', description: 'Can access administrative dashboard' }
    ]
  };

  // Filter permissions based on selected role
  function getPermissionCategoriesForRole(role){
    const allowedPermissions = rolePermissions[role] || [];
    //new filtered permissions sorted by categories
    const filteredCategories = {};
    
    Object.entries(allPermissionCategories).forEach(([category, permissions]) => {
      // get permission objects that match allowed permissions
      const filteredPermissions = permissions.filter(perm => 
        allowedPermissions.includes(perm.id)
      );
      
      if (filteredPermissions.length > 0) {
        filteredCategories[category] = filteredPermissions;
      }
    });
    
    return filteredCategories;
  };

  const permissionCategories = getPermissionCategoriesForRole(formData.role);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'role') {
      // Auto-set permissions based on role
      const rolePerms = rolePermissions[value] || [];
      setFormData(prev => ({
        ...prev,
        [name]: value,
        permissions: rolePerms // Auto-assign role-based permissions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  //every check box change will check if the permission is valid for the selected role
  //if not valid, it will not change the state
  //if valid, it will toggle the permission in the permissions array
  const handlePermissionChange = (permissionId) => {
    const allowedPermissions = rolePermissions[formData.role] || [];
    
    // Only allow changes to permissions that are valid for this role
    if (!allowedPermissions.includes(permissionId)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.employeeId || !formData.firstName || !formData.lastName || 
        !formData.email || !formData.mobile || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate PIN code if provided
    if (formData.pinCode && (formData.pinCode.length !== 4 || !/^\d{4}$/.test(formData.pinCode))) {
      alert('PIN code must be exactly 4 digits');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await onSubmit(formData);
      
      // Reset form
      setFormData({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        startDate: '',
        employmentType: 'full_time',
        team: 'floor',
        role: 'staff_level_1',
        pinCode: '',
        permissions: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error adding staff member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <IoPerson size={24} />
            Add New Staff Member
          </h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Personal Information Section */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionHeader}>
              <IoPerson size={20} />
              Personal Information
            </h3>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="employeeId">
                  Employee ID *
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., EMP001"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="startDate">
                  Start Date *
                </label>
                <input
                  className={styles.input}
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">
                  <IoPerson size={16} />
                  First Name *
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter first name"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter last name"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">
                  <IoMail size={16} />
                  Email Address *
                </label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="mobile">
                  <IoCall size={16} />
                  Phone Number *
                </label>
                <input
                  className={styles.input}
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Employment Details Section */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionHeader}>
              <IoShield size={20} />
              Employment Details
            </h3>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="employmentType">
                  Employment Type *
                </label>
                <select
                  className={styles.select}
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="contractor">Contractor</option>
                  <option value="intern">Intern</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="team">
                  Team *
                </label>
                <select
                  className={styles.select}
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                >
                  <option value="kitchen">Kitchen</option>
                  <option value="floor">Floor</option>
                  <option value="sales">Sales</option>
                  <option value="management">Management</option>
                  <option value="barista">Barista</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="role">
                  Role *
                </label>
                <select
                  className={styles.select}
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  {userRole === 'owner' && (
                    <>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                      <option value="supervisor">Supervisor</option>
                    </>
                  )}
                  {(userRole === 'owner' || userRole === 'admin') && (
                    <>
                      <option value="staff_level_2">Staff Level 2</option>
                    </>
                  )}
                  <option value="staff_level_1">Staff Level 1</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="pinCode">
                  PIN Code (Optional)
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  maxLength="4"
                  placeholder="4-digit PIN for POS login"
                />
              </div>
            </div>
          </div>

          {/* Permissions Section */}
          <div className={styles.permissionsSection}>
            <h3 className={styles.permissionsTitle}>
              <IoShield size={20} />
              Role Permissions
            </h3>
            
            <div className={styles.permissionsNote}>
              <p className={styles.permissionsNoteText}>
                <strong>Note:</strong> Permissions are automatically assigned based on the selected role. 
                You can adjust them as needed for this specific user.
              </p>
            </div>
            
            <div className={styles.permissionsGrid}>
              {Object.entries(permissionCategories).map(([category, permissions]) => (
                <div key={category} className={styles.permissionCategory}>
                  <h4 className={styles.categoryTitle}>{category}</h4>
                  {permissions.map(permission => (
                    <div key={permission.id} className={styles.permissionItem}>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        id={permission.id}
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                      />
                      <label 
                        className={styles.permissionLabel} 
                        htmlFor={permission.id}
                        title={permission.description}
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {Object.keys(permissionCategories).length === 0 && (
              <div className={styles.noPermissionsMessage}>
                <p className={styles.noPermissionsText}>No permissions available for the selected role.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.submitButton} ${isLoading ? styles.loadingButton : ''}`}
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading && <div className={styles.loadingSpinner}></div>}
              {isLoading ? 'Adding Staff...' : 'Add Staff Member'}
            </button>
          </div>
        </div>
      
    </>
  );
}
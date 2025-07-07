export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
    return localStorage.getItem('access_token');
};

export const hasPermission = (permission) => {
    const user = getUser();
    console.log("Checking permission:", permission, "for user:", user);
    return user?.permissions?.includes(permission) || false;
};

export const hasRole = (role) => {
    const user = getUser();
    return user?.role === role;
};

export const isAuthenticated = () => {
    return !!getToken() && !!getUser();
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
};

// Permission constants
export const PERMISSIONS = {
    // Admin Dashboard Access
    ACCESS_ADMIN_DASHBOARD: 'access_admin_dashboard',
    
    // Order Management
    VIEW_ORDER: 'view_order',
    TAKE_ORDER: 'take_order',
    EDIT_ORDER: 'edit_order',
    REQUEST_REFUND: 'request_refund',
    MANAGE_REFUND: 'manage_refund',
    
    // Category Management
    MANAGE_CATEGORY: 'manage_category',
    EDIT_CATEGORY: 'edit_category',
    
    // Product Management
    MANAGE_PRODUCT: 'manage_product',
    EDIT_PRODUCT: 'edit_product',
    
    // Staff Management
    MANAGE_STAFF: 'manage_staff',
    EDIT_STAFF: 'edit_staff',
    
    // Reports
    VIEW_REPORT: 'view_report'
};
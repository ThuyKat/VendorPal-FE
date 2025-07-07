import {Routes, Route} from 'react-router-dom';
import Login from '../pages/login';
import AdminLayout from '../pages/admin';
import POSLayout from '../pages/pos';
import Dashboard from '../pages/admin/dashboard';
import Orders from '../pages/admin/orders';
import OrderDetail from '../pages/admin/orders/orderDetail';
import Categories from '../pages/admin/categories';
import CategoryDetail from '../pages/admin/categories/categoryDetail';
import Products from '../pages/admin/products';
import ProductDetail from '../pages/admin/products/productDetail';
import Staff from '../pages/admin/staffs';
import StaffDetail from '../pages/admin/staffs/staffDetail';
import Reports from '../pages/admin/reports';
import Settings from '../pages/admin/settings';
import PageNotFound from '../pages/PageNotFound';
import { PERMISSIONS,isAuthenticated } from '../utils/auth';
import AuthGuard from '../components/AuthGuard';
import CentredLayout from '../components/CentredLayout';
import ForgotPassword from '../pages/forgotPassword';
import ResetPassword from '../pages/resetPassword';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element ={<CentredLayout/>}>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

            </Route>
            
                {/* MANAGEMENT */}
                <Route element={<AuthGuard permission={PERMISSIONS.ACCESS_ADMIN_DASHBOARD} fallbackPath="/pos"/>}>
                    <Route path="/admin" element={<AdminLayout/>} >
                        <Route index element={<Dashboard/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>

                        {/* ORDERS */}
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="orders/:id" element={<OrderDetail/>}/>

                        {/* CATEGORIES */}
                        <Route path="categories" element={<Categories/>}/>
                        <Route path="categories/:id" element={<CategoryDetail/>}/>

                        {/* PRODUCTS */}
                        <Route path="products" element={<Products/>}/>
                        <Route path="products/:id" element={<ProductDetail/>}/>

                        {/* STAFF */}
                        <Route path="staff" element={<Staff/>}/>
                        <Route path="staff/:id" element={<StaffDetail/>}/>  

                        {/* REPORTS & SETTINGS */}
                        <Route path="reports" element={<Reports/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Route>
                </Route>

                {/* POS */}
            <Route element={<AuthGuard fallbackPath="/login"/>}>
                <Route path="/pos" element={<POSLayout/>} />
            </Route>
        </Routes>
    );
}
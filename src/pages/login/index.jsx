import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import styles from "./login.module.css";
import Button from "../../components/button";
import image from "../../assets/shoplogo.svg";
import clsx from "clsx"
import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import {handleSuccessLogin} from "../../utils/handleSuccessLogin.js";
import { loginUser } from "../../api/loginUser.js";
import { isAuthenticated } from "../../utils/auth.js";
import { useEffect } from "react";
export default function Login() {
    //STATE MANAGEMENT
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [activeRole, setActiveRole] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginBtn = useRef(null);
     useEffect(() => {
        if (isAuthenticated()) {
            setIsLoggedIn(true);
        }
    }, []);
    //HANDLERS
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async(FormData) => {
        const loginCredentials = Object.fromEntries(FormData.entries());
        loginBtn.current.disabled = true
        loginBtn.current.style.backgroundColor="grey"
        // Redirect or perform login action
        try{
            setError(null);
            // Call the login API with the credentials
            const response = await loginUser(loginCredentials) 
            console.log(response);
            if(response.status === 200  ) {
                handleSuccessLogin(response.data);
                setIsLoggedIn(true);
                setError(null);
            }else{
                setError(response.data.error || "Login failed. Please try again.");
            }
        }catch(error){
            setError(error||'Login failed. Please try again.')
        }finally{
            loginBtn.current.disabled = false;
            loginBtn.current.style.backgroundColor="#3b82f6"
        }
    };
    const handleRoleClick = (event) => {
        const selectedEl = event.target;
        setActiveRole(selectedEl.textContent);
        if(selectedEl.textContent === "Staff") {
            setFormData({
                username: 'staff@shop.com',
                password:'staff123'
            })
        }else{
            setFormData({
                username: 'admin@shop.com', 
                password: 'admin123'
            })
        }
    };
     if (isLoggedIn) {
        return <Navigate to="/admin" replace />;
    }
    return (
    <>
    
        <img src={image} alt="VendorPal Logo" className={styles.logo}/>
        

        <div className={styles['login-container']}>
        
             <div className={styles.header}>
                <h2>Welcome back</h2>
                <p>Please sign in to your account</p>
            </div>
            <div className={styles['form-content']}>
                {/* THIS IS FOR DEMO ONLY TO POPULATE LOGIN FORM*/}
                <div className="form-group">
                    <div className={styles['form-label']}>Login as</div>
                    <div className={styles['role-grid']}>
                        <Button  icon={<IoSettingsOutline/>} className={clsx(styles["role-btn"],{[styles["active"]]: activeRole ==='Admin'})} onClick={handleRoleClick}>Admin</Button>
                        <Button  icon={<IoPeopleOutline/>} className={clsx(styles["role-btn"],{[styles["active"]]: activeRole ==='Staff'})} onClick={handleRoleClick}>Staff</Button>
                    </div>
                </div>
                {/* END OF DEMO LOGIN OPTIONS */}
                <form className="login-form" action={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className={styles['form-label']}>Username</label>
                        <input type="email" id="username" name="username" className={styles['form-input']} value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className={styles['form-label']}>Password</label>
                        <input type="password" id="password" name="password" className={styles['form-input'] } value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className={styles["remember-forgot"]}>
                        <label htmlFor="remember-me" className={styles['remember-group']}>
                            <input type="checkbox" id="remember-me" name="remember-me" className={styles['remember-checkbox']}/>
                            <span className={styles["remember-text"]}>Remember me</span>
                        </label>
                        <a href="/forgot-password" className={styles['forgot-password']}>Forgot password?</a>
                    </div>
                    <div className={styles['error-message']}>
                        {error && <p className={styles['error-text']}>{error.message}</p>}
                    </div>
                    <Button ref={loginBtn} type="submit" className={styles['login-btn']}>Sign in</Button>
                </form>
            </div>
        </div>
    </>
    );
}
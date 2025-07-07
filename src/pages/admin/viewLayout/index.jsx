import Header from '../../../components/header';
import Footer from '../../../components/footer';
import { Outlet } from 'react-router-dom';  
import { FaBell } from "react-icons/fa";
import UserIcon from "../../../components/userIcon";
import Button from "../../../components/button";
import styles from './layout.module.css';
import { IoMdExit } from "react-icons/io";
import logoutUser from '../../../utils/logoutUser';
export default function Layout({headerProps,footerProps={},children}) {
     
    return (
        <div className={styles['layout']}>
            <Header 
            {...headerProps} 
            headerRight={[
            <Button key="notification" className={styles["notification-btn"]} variant="icon" shape="rounded" icon={<FaBell/>}/>,
            <UserIcon key="userIcon" userName="Admin" userInitial="A"/>  
            ,<Button key="logout" className={styles["logout-btn"]} variant="icon" shape="rounded" icon={<IoMdExit/>} onClick={logoutUser}
            />
            ]}>
            </Header>
            <div className={styles['main-content']}>
                {children || <Outlet />}
            </div>
            <Footer {...footerProps}/>
        </div>
    );
}
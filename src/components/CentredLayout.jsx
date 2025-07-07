import { Outlet } from 'react-router-dom';
export default function CentredLayout({ children },direction='column') {
  // This component is used to center content on the page, typically for login or other standalone
  // pages. It uses flexbox to center its children both vertically and horizontally.
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: direction,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box'
    }}>
        {children || <Outlet />}
    </div>
    
  );
}
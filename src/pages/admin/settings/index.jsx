import { 
  HiCog, 
  HiShieldCheck, 
  HiBell, 
  HiDatabase,
  HiMail,
  HiSave
} from 'react-icons/hi';
import { useState } from 'react';
import styles from './settings.module.css';
import Button from '../../../components/button';
import SettingsCard from './settingCard';
export default function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    businessName: 'My Business',
    businessEmail: 'contact@mybusiness.com',
    timezone: 'UTC-5',
    currency: 'USD',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    orderAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordRequirement: 'strong',
    
    // System
    autoBackup: true,
    dataRetention: '12',
    maintenanceMode: false
  });

  const handleInputChange = (key, value) => {{
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }};

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
    
  };

  const settingsSections = [
    {
      title: 'General Settings',
      icon: HiCog,
      colorClass: styles.colorBlue,
      fields: [
        { key: 'businessName', label: 'Business Name', type: 'text', value: settings.businessName },
        { key: 'businessEmail', label: 'Business Email', type: 'email', value: settings.businessEmail },
        { key: 'timezone', label: 'Timezone', type: 'select', value: settings.timezone, options: ['UTC-5', 'UTC-6', 'UTC-7', 'UTC-8'] },
        { key: 'currency', label: 'Currency', type: 'select', value: settings.currency, options: ['USD', 'EUR', 'GBP', 'CAD'] }
      ]
    },
    {
      title: 'Notifications',
      icon: HiBell,
      colorClass: styles.colorOrange,
      fields: [
        { key: 'emailNotifications', label: 'Email Notifications', type: 'toggle', value: settings.emailNotifications },
        { key: 'pushNotifications', label: 'Push Notifications', type: 'toggle', value: settings.pushNotifications },
        { key: 'smsNotifications', label: 'SMS Notifications', type: 'toggle', value: settings.smsNotifications },
        { key: 'orderAlerts', label: 'Order Alerts', type: 'toggle', value: settings.orderAlerts }
      ]
    },
    {
      title: 'Security',
      icon: HiShieldCheck,
      colorClass: styles.colorRed,
      fields: [
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', type: 'toggle', value: settings.twoFactorAuth },
        { key: 'sessionTimeout', label: 'Session Timeout (minutes)', type: 'number', value: settings.sessionTimeout },
        { key: 'passwordRequirement', label: 'Password Strength', type: 'select', value: settings.passwordRequirement, options: ['weak', 'medium', 'strong'] }
      ]
    },
    {
      title: 'System & Data',
      icon: HiDatabase,
      colorClass: styles.colorGreen,
      fields: [
        { key: 'autoBackup', label: 'Automatic Backup', type: 'toggle', value: settings.autoBackup },
        { key: 'dataRetention', label: 'Data Retention (months)', type: 'number', value: settings.dataRetention },
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'toggle', value: settings.maintenanceMode }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={handleSave} className={styles.saveButton} icon={<HiSave className={styles.icon} />}>
          Save Changes
        </Button>
      </div>

      <div className={styles.grid}>
        {settingsSections.map((section, sectionIndex) => {
          const IconComponent = section.icon; 
          return (
            <SettingsCard
              key={sectionIndex}
              icon={<IconComponent/>}
              section={section}
              handleInputChange={handleInputChange}
              handleToggle={handleToggle}
            />
            
          );
        })}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerCard}>
          <div className={styles.footerHeader}>
            <HiMail className={styles.footerIcon} />
            <h3 className={styles.footerTitle}>Need Help?</h3>
          </div>
          <p className={styles.footerText}>
            Contact our support team if you need assistance with your settings.
          </p>
          <Button className={styles.contactButton}>Contact Support</Button>
        </div>
      </div>
    </div>
  )
}
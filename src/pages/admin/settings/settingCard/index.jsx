import Form from '../../../../components/Form';
import styles from './SettingCard.module.css';
export default function SettingCard({ icon,section, handleInputChange,handleToggle}) {
  return (
    <div key={sectionIndex} className={styles.settingsCard}>
        <div className={styles.cardHeader}>
            <div className={`${styles.iconContainer} ${section.colorClass}`}>
                {icon && <icon className={styles.icon} />}
            </div>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
        </div>

        <div className={styles.fieldsContainer}>
        {section.fields.map((field, fieldIndex) => (
            <Form.FormField 
            key={fieldIndex} 
            className={styles.fieldGroup}
            type={field.type}
            value={field.value}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            onToggle={() => handleToggle(field.key)}
            options={field.options}
            label={field.label}
            labelStyle={styles.fieldLabel}
            >
            {/* <label className={styles.fieldLabel}>{field.label}</label> */}
            
            {/* {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className={styles.input}
                />
            ) : field.type === 'select' ? (
                <select
                value={field.value}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className={styles.select}
                >
                {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
            ) : field.type === 'toggle' ? (
                <div className={styles.toggleContainer}>
                <button
                    onClick={() => handleToggle(field.key)}
                    className={`${styles.toggle} ${field.value ? styles.toggleOn : styles.toggleOff}`}
                >
                    <div className={`${styles.toggleSlider} ${field.value ? styles.sliderOn : styles.sliderOff}`} />
                </button>
                <span className={styles.toggleStatus}>{field.value ? 'Enabled' : 'Disabled'}</span>
                </div>
            ) : null} */}
            </Form.FormField>
        ))}
        </div>
    </div>
  );
}
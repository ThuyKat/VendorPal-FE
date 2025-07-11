import FormField from '../../../../components/form/formField';
import styles from './SettingCard.module.css';
export default function SettingCard({ icon,section, handleInputChange,handleToggle}) {
  return (
    <div className={styles.settingsCard}>
        <div className={styles.cardHeader}>
            <div className={`${styles.iconContainer} ${section.colorClass}`}>
                {icon}
            </div>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
        </div>
        <div className={styles.fieldsContainer}>
        {section.fields.map((field, fieldIndex) => (
            <FormField 
              key={fieldIndex} 
              className={styles.fieldGroup}
              type={field.type}
              value={field.value}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              onToggle={() => handleToggle(field.key)}
              options={field.options}
              label={field.label}
              labelStyle={styles.fieldLabel}
            />
        ))}
        </div>
    </div>
  );
}
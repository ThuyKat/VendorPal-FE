import styles from './formField.module.css';
import clsx from 'clsx';
export default function FormField({
  label, 
  labelStyle,   
  name,
  type = 'text',
  placeholder = '',
  options = [],
  checked = false,
  value,
  onChange,
  required = false,
  className = '',
}) {
    const inputClass = clsx(styles.input, {
        [styles.required]: required,
        [styles.error]: !value && required,
    });
    const formGroupClass = clsx(styles.formGroup, className);
    
    if (type === 'checkbox') {
        return (
            <div className={formGroupClass}>
                <label className={clsx(styles.checkboxLabel, labelStyle)}>
                    <input
                        type="checkbox"             
                        name={name}
                        checked={checked}
                        onChange={onChange}
                        className={styles.checkboxInput}
                    />

                    {label}
                </label>
            </div>
        );
    }
    if (type === 'select') {    
        return (
            <div className={formGroupClass}>
                {label && <label htmlFor={name} className={clsx(styles.label,labelStyle)}>{label}</label>}
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={inputClass}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
  return (
    <div className={formGroupClass}>
      {label && <label htmlFor={name} className={clsx(styles.label,labelStyle)}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      />
    </div>
  );
}
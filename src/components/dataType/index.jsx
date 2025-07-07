import styles from './datatype.module.css';

// Get status color based on common status values
const getStatusColor = (status) => {
  const statusLower = String(status).toLowerCase();
  
if (['completed', 'delivered', 'paid', 'approved', 'published', 'success', 'ready', 'out_for_delivery'].includes(statusLower)) {
  return styles.statusSuccess;
}
if (['active', 'preparing', 'kitchen_queue', 'quality_check', 'processing', 'in_progress', 'waiting'].includes(statusLower)) {
  return styles.statusWarning;
}
if (['pending', 'saved', 'review'].includes(statusLower)) {
  return styles.statusDeciding;
}
if (['cancelled', 'failed', 'rejected', 'inactive', 'deleted', 'unpaid', 'refund_requested', 'refund_approved', 'refunded'].includes(statusLower)) {
  return styles.statusDanger;
}
if (['draft', 'paused', 'on_hold', 'scheduled'].includes(statusLower)) {
  return styles.statusInfo;
}
  
  return styles.statusDefault;
};

export default function DataType({ 
  variant = 'text', 
  value, 
  className = '' 
}) {
  // Handle null/undefined values
  if (value === null || value === undefined) {
    return <span className={`${styles.emptyValue} ${className}`}>—</span>;
  }

  switch (variant) {
    case 'status':
      return (
        <span className={`${styles.statusPill} ${getStatusColor(value)} ${className}`}>
          {String(value).replace(/_/g, ' ')}
        </span>
      );
      
    case 'tag':
      if (Array.isArray(value)) {
        return (
          <div className={`${styles.tagsContainer} ${className}`}>
            {value.map((item, index) => (
              <span key={index} className={styles.tag}>
                {item}
              </span>
            ))}
          </div>
        );
      }
      return (
        <span className={`${styles.tag} ${className}`}>
          {String(value)}
        </span>
      );
      
    case 'currency':
      return (
        <span className={`${styles.currencyValue} ${className}`}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value)}
        </span>
      );
    default:
      return (
        <span className={`${styles.textValue} ${className}`}>
          {String(value)}
        </span>
      );
  }
}
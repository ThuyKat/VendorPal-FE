import DataType from '../dataType';
import { getActionConfig } from './actionConfig';
import Button from '../button';
import styles from './dataTable.module.css';
export default function Table({ 
  data = [],
  dataTypes = {},
  excludeKeys = [],
  actions = [], // Array of strings: ['view', 'edit', 'delete']
  onAction = null // Callback function: (actionType, row) => void
}) {
// Get column keys from dataTypes
const keys = Object.keys(dataTypes);
  
// Filter out excluded keys
const filteredKeys = excludeKeys.length > 0 
    ? keys.filter(key => !excludeKeys.includes(key))
    : keys;
// Utility function to format header labels from keys
const formatHeader = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/_/g, ' '); // Replace underscores with spaces
};
// Create columns from dataTypes
const columns = filteredKeys.map(key => ({
    header: formatHeader(key), // Format header label
    key: key
  }));
  

 

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={styles.tableHeader}>
                  {column.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className={styles.tableHeader}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className={styles.tableRow}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={styles.tableCell}>
                    <DataType 
                      variant={dataTypes[column.key] || 'text'} 
                      value={row[column.key]} 
                    />
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className={styles.tableCell}>
                    <div className={styles.actionsContainer}>
                      {actions.map((actionType, actionIndex) => {
                        const action = getActionConfig(actionType);
                        if (!action) return null;
                        return (
                          <Button
                            key={actionIndex}
                            onClick={() => onAction && onAction(actionType, row)}
                            className={styles.actionButton}
                            icon={<action.icon className={styles[`${actionType}-button`]}/>}
                          >
                          </Button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';

// Predefined action configurations
export const getActionConfig = (actionType) => {
  const configs = {
    view: {
      icon: HiEye ,
      title: 'View'
    },
    edit: {
      icon: HiPencil,
      title: 'Edit'
    },
    delete: {
      icon: HiTrash,
      title: 'Delete'
    }
  };
  
  return configs[actionType] || null;
};
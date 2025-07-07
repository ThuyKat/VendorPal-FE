import  { useState, useEffect } from 'react';
import { IoFolder, IoResize, IoPencil, IoChevronDown, IoChevronForwardOutline, IoAdd, IoApps } from 'react-icons/io5';
import styles from './categories.module.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock category data structure matching the JSP
        const mockCategories = [
          {
            id: 1,
            name: 'Beverages',
            subcategories: [
              {
                id: 11,
                name: 'Coffee',
                sizes: [
                  { id: 111, name: 'Small' },
                  { id: 112, name: 'Medium' },
                  { id: 113, name: 'Large' }
                ]
              },
              {
                id: 12,
                name: 'Tea',
                sizes: [
                  { id: 121, name: 'Regular' },
                  { id: 122, name: 'Large' }
                ]
              }
            ],
            sizes: [] // Removed direct sizes, only subcategories now
          },
          {
            id: 2,
            name: 'Food',
            subcategories: [
              {
                id: 21,
                name: 'Sandwiches',
                sizes: [
                  { id: 211, name: 'Half' },
                  { id: 212, name: 'Full' }
                ]
              },
              {
                id: 22,
                name: 'Pastries',
                sizes: []
              }
            ],
            sizes: []
          },
          {
            id: 3,
            name: 'Desserts',
            subcategories: [],
            sizes: [
              { id: 301, name: 'Individual' },
              { id: 302, name: 'Family Size' }
            ]
          }
        ];
        
        setCategories(mockCategories);
        // Expand all categories by default for demo
        setExpandedCategories(new Set([1, 2, 3, 11, 12, 21, 22]));
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleEditCategory = (categoryId) => {
    console.log('Edit category:', categoryId);
    // Implement edit category logic
    setMessage(`Editing category ${categoryId}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEditSize = (sizeId) => {
    console.log('Edit size:', sizeId);
    // Implement edit size logic
    setMessage(`Editing size ${sizeId}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddCategory = () => {
    console.log('Add new category');
    setMessage('Add category functionality');
    setTimeout(() => setMessage(''), 3000);
  };

  const renderSizes = (sizes) => {
    if (!sizes || sizes.length === 0) return null;

    return (
      <div className={styles.sizesContainer}>
        <div className={styles.sizesHeader}>
          <IoResize size={16} />
          <span>Sizes:</span>
        </div>
        {sizes.map(size => (
          <div key={size.id} className={styles.sizeItem}>
            <span className={styles.sizeName}>{size.name}</span>
            <button
              className={styles.editButton}
              onClick={() => handleEditSize(size.id)}
              title={`Edit ${size.name}`}
            >
              <IoPencil size={14} />
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderSubcategories = (subcategories) => {
    if (!subcategories || subcategories.length === 0) return null;

    return (
      <div className={styles.subcategoriesContainer}>
        {subcategories.map(subcategory => (
          <div key={subcategory.id} className={styles.categoryItem}>
            <div className={styles.categoryHeader}>
              <button
                className={styles.expandButton}
                onClick={() => toggleCategory(subcategory.id)}
              >
                {expandedCategories.has(subcategory.id) ? 
                  <IoChevronDown size={16} /> : 
                  <IoChevronForwardOutline size={16} />
                }
              </button>
              <IoFolder size={18} />
              <span className={styles.categoryName}>{subcategory.name}</span>
              <button
                className={styles.editButton}
                onClick={() => handleEditCategory(subcategory.id)}
                title={`Edit ${subcategory.name}`}
              >
                <IoPencil size={14} />
                Edit
              </button>
            </div>
            {expandedCategories.has(subcategory.id) && (
              <div className={styles.categoryContent}>
                {renderSizes(subcategory.sizes)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCategories = (categories) => {
    return categories.map(category => (
      <div key={category.id} className={styles.categoryItem}>
        <div className={styles.categoryHeader}>
          <button
            className={styles.expandButton}
            onClick={() => toggleCategory(category.id)}
          >
            {expandedCategories.has(category.id) ? 
              <IoChevronDown size={16} /> : 
              <IoChevronForwardOutline size={16} />
            }
          </button>
          <IoFolder size={18} />
          <span className={styles.categoryName}>{category.name}</span>
          <button
            className={styles.editButton}
            onClick={() => handleEditCategory(category.id)}
            title={`Edit ${category.name}`}
          >
            <IoPencil size={14} />
            Edit
          </button>
        </div>
        {expandedCategories.has(category.id) && (
          <div className={styles.categoryContent}>
            {renderSubcategories(category.subcategories)}
            {renderSizes(category.sizes)}
          </div>
        )}
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <IoApps size={24} />
          <h1 className={styles.title}>Category Structure</h1>
        </div>
        <button
          className={styles.addButton}
          onClick={handleAddCategory}
          title="Add New Category"
        >
          <IoAdd size={16} />
          Add Category
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div className={styles.messageAlert}>
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className={styles.errorAlert}>
          <p>{error}</p>
        </div>
      )}

      {/* Category Tree */}
      <div className={styles.categoryTree}>
        {categories.length > 0 ? (
          renderCategories(categories)
        ) : (
          <div className={styles.emptyState}>
            <IoFolder size={48} />
            <h3>No Categories Found</h3>
            <p>Start by creating your first category</p>
            <button
              className={styles.addButton}
              onClick={handleAddCategory}
            >
              <IoAdd size={16} />
              Add Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
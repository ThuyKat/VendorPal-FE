import { HiFilter, HiPlus, HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import styles from './products.module.css';
import Table from '../../../components/dataTable';
import Button from '../../../components/button';
import SearchBar from '../../../components/searchBar';
import { useFetch } from '../../../hooks/useFetch';

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    category: "Clothing",
    price: "29.99",
    stock: 15,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: "89.99",
    stock: 8,
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "199.99",
    stock: 3,
    sizes: ["One Size"]
  }
];

export default function Products() {
const {data} = useFetch('/tenant/products');

const handleSearch = (searchTerm) => {
            console.log("Search Term:", searchTerm);
            // search functionality here
        };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Button className={styles.filterButton} icon={<HiFilter className={styles.icon} />}>
            <span>Filter by Category</span>
          </Button>
        </div>
        <SearchBar onChange={handleSearch}/>
        <Button className={styles.addButton} icon={<HiPlus className={styles.icon} />}>
          <span>Add Product</span>
        </Button>
      </div>
      <Table
        data={data?.data || products}
        dataTypes={{
          id: 'text',
          name: 'text',
          category: 'text',
          price: 'currency',
          stock: 'text',
          sizes: 'tag'
        }}
        actions={['view', 'edit', 'delete']}
        onAction={(action, row) => {
          if (action === 'view') {
            console.log('View product:', row.id);
          } else if (action === 'edit') {
            console.log('Edit product:', row.id);
          } else if (action === 'delete') {
            console.log('Delete product:', row.id);
          }
        }}
      />
    </div>
  );
}
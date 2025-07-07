import styles from './productList.module.css';
import ProductCard from '../productCard';
import { useContext } from 'react';
import { POSContext } from '../index'
import GridList from '../../../components/gridList';
export default function ProductList({products=[]}){
    const { setCart } = useContext(POSContext);
    // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

    return(
        <GridList className={styles.productGrid}>
          {products.map((product) => (
          <ProductCard
              key={product.id}
              product={product}
              onClick={() => addToCart(product)}
          />
          ))}
        </GridList>
       
    )
}
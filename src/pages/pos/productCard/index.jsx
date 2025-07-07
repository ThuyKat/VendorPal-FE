import styles from './productCard.module.css';
export default function ProductCard({ product, onClick=()=>{},image }) {
  return (
    <div
        key={product.id}
        onClick={onClick}
        className={styles.productCard}
    >
        <div className={styles.productImage}>
        {/* <HiCube className={styles.productIcon} /> */}
        <img src={image} alt={product.name} className={styles.productIcon} />
        </div>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productStock}>Stock: {product.stock}</p>
    </div>
  );
}
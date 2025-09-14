import { useProductContext } from "../context/ProductContext";
import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export const ProductList = () => {
  const { products, searchQuery } = useProductContext();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="product-list"
      role="listbox"
      aria-label="Product list"
      aria-multiselectable="true"
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

import { KeyboardEvent } from "react";
import { Product } from "../types/product";
import { useProductContext } from "../context/ProductContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleProductSelection, selectedProducts } = useProductContext();
  const isSelected = selectedProducts.some((p) => p.id === product.id);
  const isDisabled = selectedProducts.length >= 3 && !isSelected;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isDisabled) {
        toggleProductSelection(product.id);
      }
    }
  };

  return (
    <div
      className={`product-card ${isSelected ? "selected" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      role="option"
      aria-selected={isSelected}
    >
      <img
        src={product.image}
        alt={`${product.brand} ${product.name}`}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="brand">{product.brand}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <ul className="features">
          {Object.entries(product.features)
            .slice(0, 3)
            .map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
        </ul>
        <button
          className="compare-button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) {
              toggleProductSelection(product.id);
            }
          }}
          disabled={isDisabled}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label={
            isSelected ? "Remove from comparison" : "Add to comparison"
          }
        >
          {isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
      </div>
    </div>
  );
};

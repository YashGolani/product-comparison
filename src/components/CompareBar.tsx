import { useProductContext } from "../context/ProductContext";
import "./CompareBar.css";

export const CompareBar = () => {
  const { selectedProducts, clearComparison } = useProductContext();

  if (selectedProducts.length < 2) return null;

  const handleCompareClick = () => {
    const compareSection = document.getElementById("comparison-view");
    if (compareSection) {
      compareSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        compareSection.focus();
      }, 500);
    }
  };

  return (
    <div
      className="compare-bar"
      role="complementary"
      aria-label="Product comparison bar"
    >
      <div className="compare-bar-content">
        <span className="selected-count">
          {selectedProducts.length} products selected
        </span>
        <div className="compare-bar-actions">
          <button
            className="compare-action-button"
            onClick={clearComparison}
            aria-label="Clear all selected products"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                clearComparison();
              }
            }}
          >
            Clear All
          </button>
          <button
            className="compare-action-button primary"
            onClick={handleCompareClick}
            aria-label="View comparison"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCompareClick();
              }
            }}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

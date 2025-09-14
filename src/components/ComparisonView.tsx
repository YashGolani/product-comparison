import { useProductContext } from "../context/ProductContext";
import "./ComparisonView.css";

export const ComparisonView = () => {
  const { selectedProducts, removeProduct } = useProductContext();

  if (selectedProducts.length < 2) return null;

  const allFeatures = selectedProducts.reduce((features, product) => {
    Object.keys(product.features).forEach((feature) => {
      if (!features.includes(feature)) {
        features.push(feature);
      }
    });
    return features;
  }, [] as string[]);

  const isDifferent = (feature: string): boolean => {
    const values = selectedProducts.map((p) => p.features[feature]);
    return new Set(values).size > 1;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    productId: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      removeProduct(productId);
    } else if (e.key === "Tab" && !e.shiftKey) {
      const nextButton =
        e.currentTarget.parentElement?.nextElementSibling?.querySelector(
          "button"
        );
      if (nextButton) {
        e.preventDefault();
        nextButton.focus();
      }
    } else if (e.key === "Tab" && e.shiftKey) {
      const prevButton =
        e.currentTarget.parentElement?.previousElementSibling?.querySelector(
          "button"
        );
      if (prevButton) {
        e.preventDefault();
        prevButton.focus();
      }
    }
  };

  return (
    <section
      id="comparison-view"
      className="comparison-view"
      aria-label="Product comparison table"
    >
      <h2>Product Comparison</h2>
      <div
        className={`comparison-grid products-${selectedProducts.length}`}
        role="grid"
      >
        <div
          className={`comparison-header products-${selectedProducts.length}`}
          role="row"
        >
          <div className="feature-label" role="columnheader">
            Features
          </div>
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="product-column"
              role="columnheader"
            >
              <button
                className="remove-product"
                onClick={() => removeProduct(product.id)}
                onKeyDown={(e) => handleKeyDown(e, product.id)}
                aria-label={`Remove ${product.name} from comparison`}
                tabIndex={0}
              >
                ×
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="comparison-image"
              />
              <h3>{product.name}</h3>
              <p className="comparison-brand">{product.brand}</p>
              <p className="comparison-price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div
          className={`comparison-body products-${selectedProducts.length}`}
          role="rowgroup"
        >
          {allFeatures.map((feature) => (
            <div
              key={feature}
              className={`comparison-row ${
                isDifferent(feature) ? "highlight" : ""
              }`}
              role="row"
            >
              <div className="feature-label" role="rowheader">
                {feature}
              </div>
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="feature-value"
                  role="cell"
                  aria-label={`${feature} for ${product.name}`}
                >
                  {product.features[feature] || "N/A"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

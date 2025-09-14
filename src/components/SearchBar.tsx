import { useProductContext } from "../context/ProductContext";
import "./SearchBar.css";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useProductContext();

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products by name or brand..."
          aria-label="Search products"
          className="search-input"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-button"
            aria-label="Clear search"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

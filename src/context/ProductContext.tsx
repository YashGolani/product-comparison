import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, ProductContextType } from "../types/product";
import { mockProducts } from "../data/mockProducts";

const ProductContext = createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("isDarkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedProducts");
    if (stored) {
      const storedIds = JSON.parse(stored);
      const products = mockProducts.filter((p) => storedIds.includes(p.id));
      setSelectedProducts(products);
    }
  }, []);

  const toggleProductSelection = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    setSelectedProducts((current) => {
      const isSelected = current.some((p) => p.id === productId);
      let newSelection;

      if (isSelected) {
        newSelection = current.filter((p) => p.id !== productId);
      } else if (current.length < 3) {
        newSelection = [...current, product];
      } else {
        return current;
      }

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(newSelection.map((p) => p.id))
      );
      return newSelection;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  const clearComparison = () => {
    setSelectedProducts([]);
    localStorage.removeItem("selectedProducts");
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts((current) => {
      const newSelection = current.filter((p) => p.id !== productId);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(newSelection.map((p) => p.id))
      );
      return newSelection;
    });
  };

  const value: ProductContextType = {
    products: mockProducts,
    selectedProducts,
    searchQuery,
    isDarkMode,
    toggleProductSelection,
    setSearchQuery,
    toggleDarkMode,
    clearComparison,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

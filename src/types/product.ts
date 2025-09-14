export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  features: {
    [key: string]: string | number;
  };
}

export interface ProductContextType {
  products: Product[];
  selectedProducts: Product[];
  searchQuery: string;
  isDarkMode: boolean;
  toggleProductSelection: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  clearComparison: () => void;
  removeProduct: (productId: string) => void;
}

import { ProductProvider } from "./context/ProductContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { SearchBar } from "./components/SearchBar";
import { ProductList } from "./components/ProductList";
import { CompareBar } from "./components/CompareBar";
import { ComparisonView } from "./components/ComparisonView";
import "./App.css";

function App() {
  return (
    <ProductProvider>
      <div className="app">
        <header className="app-header">
          <h1>Product Comparison</h1>
          <ThemeToggle />
        </header>
        <main>
          <SearchBar />
          <ProductList />
          <ComparisonView />
        </main>
        <CompareBar />
      </div>
    </ProductProvider>
  );
}

export default App;

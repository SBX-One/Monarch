import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Testing from "./pages/testing";
import HomePages from "./pages/HomePage";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/search-result/:query" element={<SearchResult />} />
          <Route path="/search-result/" element={<SearchResult />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Testing from "./pages/testing";
import HomePages from "./pages/HomePage";
import SearchResult from "./pages/SearchResult";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/search-result/:query" element={<SearchResult />} />
          <Route path="/search-result/" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Testing from "./pages/testing";
import HomePages from "./pages/HomePage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

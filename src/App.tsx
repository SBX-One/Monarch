import { BrowserRouter, Route, Routes } from "react-router-dom";
import Testing from "./pages/testing";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

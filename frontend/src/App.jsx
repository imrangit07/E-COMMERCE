import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="/category/:slug" element={<Items />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
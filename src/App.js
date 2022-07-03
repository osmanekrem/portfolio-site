import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Home from "./pages/Home";

import './styles.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

      </Routes>
        
    </div>
  );
}

export default App;

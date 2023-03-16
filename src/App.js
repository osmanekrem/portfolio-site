import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";

import './styles.scss';
import Login from "./pages/Login";
import Dasboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dasboard />} />

      </Routes>

        
    </div>
  );
}

export default App;

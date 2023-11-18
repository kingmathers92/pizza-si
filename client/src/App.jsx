import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<AnimatedRoutes />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/cart" element={<ProtectedRoute />}>
            <Route exact path="/cart" element={<Cart />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;

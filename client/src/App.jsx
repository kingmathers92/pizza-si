import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Login from "./components/Login";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AnimatedRoutes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;

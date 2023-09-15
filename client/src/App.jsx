import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;

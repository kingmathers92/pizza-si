import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { loadStripe } from "@stripe/stripe-js";
//import { Elements } from "@stripe/react-stripe-js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

//const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    //<Elements stripe={stripePromise}>
      <Suspense fallback={null}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="*" element={<AnimatedRoutes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    //</Elements>
  );
}

export default App;

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
import CashOnDeliveryForm from "./components/CashOnDeliveryForm";
import StripeContainer from "./components/StripeContainer";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import SuccessPage from "./pages/SuccessPage";
import CanceledPage from "./pages/CanceledPage";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AnimatedRoutes />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/cart" element={<Cart />} />
            <Route path="/stripe-checkout" element={<StripeContainer />} />
            <Route path="/cash-on-delivery" element={<CashOnDeliveryForm />} />
          </Route>
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/canceled" element={<CanceledPage />} />
          <Route path="/*" replace element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;

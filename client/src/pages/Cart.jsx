import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/cart/cartSlice";
import CheckoutForm from "../components/CheckoutForm";

import "../styles/Cart.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart?.cart);
  const dispatch = useDispatch();
  console.log("Cart component rendered");

  console.log(cart);

  const handleCleanCart = () => {
    dispatch(cleanCart());
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: {item.price}DT</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      )}
      <button className="clearCartBtn" onClick={handleCleanCart}>
        Clear Cart
      </button>
      <CheckoutForm />
    </div>
  );
}

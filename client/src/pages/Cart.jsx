import { useSelector, useDispatch } from "react-redux";
import { cleanCart, removeItem } from "../redux/user/userSlice";
import { selectUserCart } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
//import StripeContainer from "../components/StripeContainer";
import { useEffect } from "react";

import "../styles/Cart.css";

export default function Cart() {
  const cart = useSelector(selectUserCart);
  const navigate = useNavigate();
  console.log(cart);
  useEffect(() => {
    console.log("Component rendered!");
  });
  const dispatch = useDispatch();

  const handleCleanCart = () => {
    dispatch(cleanCart());
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="cart-div">
      {cart.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.itemId}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: {item.price}DT</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <CloseIcon
              className="removeBtn"
              onClick={() => handleRemoveItem(item.itemId)}
            />
          </div>
        ))
      )}
      <div className="btnContainer">
        <button className="clearCartBtn" onClick={handleCleanCart}>
          Clear Cart
        </button>
        <Link to="/menu">
          <button className="goBacktBtn">Go Back</button>
        </Link>
      </div>
      <div className="payment-method">
        <button onClick={() => navigate("/stripe-checkout")}>
          Pay with Card
        </button>
        <button onClick={() => navigate("/cash-on-delivery")}>
          Cash on Delivery
        </button>
      </div>
    </div>
  );
}

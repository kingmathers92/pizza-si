import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, cleanCart } from "../redux/cart/cartSlice";
import { selectUser, selectUserCart } from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
//import CheckoutForm from "../components/CheckoutForm";

import "../styles/Cart.css";

export default function Cart() {
  const currentUser = useSelector(selectUser);
  const cart = useSelector((state) => selectUserCart(state, currentUser?.id));
  const dispatch = useDispatch();
  console.log("Cart component rendered");

  console.log(cart);

  const handleCleanCart = () => {
    dispatch(cleanCart({ userId: currentUser.id }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
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
            <CloseIcon
              className="removeBtn"
              onClick={() => handleRemoveItem(item.id)}
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
    </div>
  );
}

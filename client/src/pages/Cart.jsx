import { useSelector, useDispatch } from "react-redux";
import { cleanCart, removeItem } from "../redux/user/userSlice";
import { selectUserCart } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

import "../styles/Cart.css";

export default function Cart() {
  const cart = useSelector(selectUserCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  console.log(cart);

  const amount = cart.reduce((total, cartItem) => total + cartItem.price, 0);

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
              <p>
                {t("price")}: {amount}DT
              </p>
              <p>
                {t("quantity")}: {item.quantity}
              </p>
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
          {t("clearCart")}
        </button>
        <Link to="/menu">
          <button className="goBacktBtn">{t("goBack")}</button>
        </Link>
      </div>
      <div className="payment-method">
        <button
          className={`btn ${cart.length === 0 ? "disabled" : ""}`}
          onClick={() =>
            navigate("/stripe-checkout", {
              state: { state: { amount }, items: cart },
            })
          }
          disabled={cart.length === 0}
        >
          {t("payWithCard")}
        </button>
        <button
          className={`btn ${cart.length === 0 ? "disabled" : ""}`}
          onClick={() => navigate("/cash-on-delivery", { state: { amount } })}
          disabled={cart.length === 0}
        >
          {t("cashDelivery")}
        </button>
      </div>
    </div>
  );
}

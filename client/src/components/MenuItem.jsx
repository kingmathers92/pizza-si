import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cart/cartSlice";
export default function MenuItem({ id, image, name, price }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, image }));
    console.log("added!");
  };

  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> DT{price} </p>
      <button className="cart-Btn" onClick={handleAddToCart}>
        Add To cart
      </button>
    </div>
  );
}

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

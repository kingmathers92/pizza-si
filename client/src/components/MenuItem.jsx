import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, addItem } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function MenuItem({ itemId, image, name, prices }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(prices[selectedSize]);

  useEffect(() => {
    setCalculatedPrice(prices[selectedSize] * quantity);
  }, [selectedSize, quantity, prices]);

  const handleAddToCart = () => {
    if (quantity > 0 && itemId !== undefined && currentUser) {
      const selectedItem = {
        itemId,
        name,
        price: prices[selectedSize],
        image,
        size: selectedSize,
        quantity,
      };

      dispatch(addItem(selectedItem));
      navigate("/cart");
    }
  };

  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <div>
        {Object.keys(prices).map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={size === selectedSize ? "selected" : ""}
          >
            {size}
          </button>
        ))}
      </div>
      <p className="price"> Price: {calculatedPrice}DT</p>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        />
      </label>
      <button className="cart-Btn" onClick={handleAddToCart}>
        Add To cart
      </button>
    </div>
  );
}

MenuItem.propTypes = {
  userId: PropTypes.number,
  itemId: PropTypes.number,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prices: PropTypes.object,
};

import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";

export default function Cart() {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <img src={item.image} alt="pizza" />
          <p>Price: {item.price}</p>
        </div>
      ))}
      <CheckoutForm />
    </div>
  );
}

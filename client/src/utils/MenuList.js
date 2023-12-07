import Pepperoni from "../assets/pepperoni.jpg";
import Vegeterian from "../assets/vegeterian.jpg";
import Mexicain from "../assets/mexicain.jpg";
import Jombon from "../assets/jombon.png";
import Napolitana from "../assets/napolitaine.jpg";
import Baguette from "../assets/baguette.jpg";
import Makloub from "../assets/makloub.jpg";
import Sweet from "../assets/sweet.jpg";

export const MenuList = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    image: Pepperoni,
    prices: { M: 16, L: 18, XL: 20 },
  },
  {
    id: 2,
    name: "Vegeterian Pizza",
    image: Vegeterian,
    prices: { M: 17, L: 19, XL: 22 },
  },
  {
    id: 3,
    name: "Mexican Pizza",
    image: Mexicain,
    prices: { M: 15.5, L: 18, XL: 21 },
  },
  {
    id: 4,
    name: "4 Seasons Pizza",
    image: "4seasons",
    prices: { M: 16, L: 18, XL: 20 },
  },
  {
    id: 5,
    name: "Jombon Pizza",
    image: Jombon,
    prices: { M: 18, L: 20, XL: 22 },
  },
  {
    id: 6,
    name: "Napolitana Pizza",
    image: Napolitana,
    prices: { M: 22, L: 24, XL: 26 },
  },
  {
    id: 7,
    name: "Baguette Farci",
    image: Baguette,
    prices: { M: 14 },
  },
  {
    id: 8,
    name: "Makloub",
    image: Makloub,
    prices: { M: 7 },
  },
  {
    id: 9,
    name: "Chocolate Pizza",
    image: Sweet,
    prices: { M: 12, L: 14, XL: 16 },
  },
  {
    id: 10,
    name: "Tunisian Sandwich",
    image: "",
    prices: { M: 5 },
  },
];

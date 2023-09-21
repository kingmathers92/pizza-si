import { MenuList } from "../utils/MenuList";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Background from "../assets/pizza_back2.jpg";

export default function Menu() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="menu"
      style={{ backgroundImage: `url(${Background})` }}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <h1 className="menuTitle">{t("menuTitle")}</h1>
      <div className="menuList">
        {MenuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

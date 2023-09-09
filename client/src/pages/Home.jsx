//import React from "react";
import "../styles/Home.css";
import { Link } from 'react-router-dom';
import Banner from '../assets/banner.jpg';
import { motion } from 'framer-motion';


export default function Home() {
  return (
    <motion.div
      className="home"
      style={{ backgroundImage: `url(${Banner})` }}
      initial={{width: 0}}
      animate={{width: "100%"}}
      exit={{x: window.innerWidth, transition: { duration: 0.1 } }}
      >
      <div className="headerContainer">
        <h1>PizzaSi Pizzeria</h1>
        <br/>
        <br/>
        <p>PIZZA TO FIT ANY TASTE</p>
        <Link to="/menu">
          <button>ORDER NOW</button>
        </Link>
      </div>
    </motion.div>
  );
}

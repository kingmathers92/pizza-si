//import React from "react";
import "../styles/Home.css";
import {Link} from 'react-router-dom';
import Banner from '../assets/banner.jpg';

export default function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
      <div className="headerContainer">
        <h1>Pizza Si</h1>
        <p>PIZZA TO FIT ANY TASTE</p>
        <Link to="/menu">
          <button>ORDER NOW</button>
        </Link>
      </div>
    </div>
  );
}

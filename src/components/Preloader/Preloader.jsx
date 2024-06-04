import React from "react";
import styles from "./Preloader.module.css";
import preloaderImg from "../../assets/img/preloader.gif";

function Preloader({ isActive }) {
  return (
    <div className={isActive ? styles.root + " " + styles.active : styles.root}>
      <img src={preloaderImg} alt="preloader" />
    </div>
  );
}

export default Preloader;

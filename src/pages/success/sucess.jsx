import React from "react";
import styles from "./success.module.css";
import { NavLink } from "react-router-dom";

function Sucess() {
  return (
    <div className={styles.root}>
      <div className="container">
        <h2>Спасибо ваша заявка принята!</h2>
        <p>Наш оператор скоро с вами свяжется</p>
        <br />
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            padding: "10px 14px",
            fontSize: "18px",
            background: "#acacf6",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          На главную
        </NavLink>
      </div>
    </div>
  );
}

export default Sucess;

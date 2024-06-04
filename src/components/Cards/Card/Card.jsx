import React from "react";

import nextBtn from "../../../assets/img/next-btn.svg";

import { NavLink } from "react-router-dom";
const tg = window.Telegram.WebApp;

function Card({ image, name, description, price, picture, id }) {
  const vibrate = () => {
    tg.HapticFeedback.impactOccurred("rigid");
  };
  return (
    <div className="card">
      <div className="card__img">
        <img src={picture} alt={name} />
      </div>
      <div className="card-text-content">
        <h3 className="card__title">{name}</h3>
        <p className="card__info">{description}</p>
        <div className="card-bottom">
          <div className="card__price">
            <span>{price}</span>₽<p>За взрослого</p>
          </div>
          <NavLink to={"/card/" + id}>
            <span onClick={vibrate} className="card__next-btn">
              <img src={nextBtn} alt="next btn" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Card;

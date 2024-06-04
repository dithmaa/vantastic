import React, { useEffect, useState } from "react";

import cardImage1 from "../../assets/img/card1.jpg";
import plaqueLogo from "../../assets/img/plaque_logo.svg";
import gradient from "../../assets/img/gradient.png";
import backArrow from "../../assets/img/back-arrow.png";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";
const tg = window.Telegram.WebApp;

function Card({ cardImages, products }) {
  const { id } = useParams();
  const [currentProductImg, setCurrentProductImg] = useState([]);
  useEffect(() => {
    setCurrentProductImg(cardImages[id - 1]);
  }, []);
  useEffect(() => {
    // Прокручиваем страницу вверх при монтировании компонента
    window.scrollTo(0, 0);
  }, []);
  const vibrate = () => {
    tg.HapticFeedback.impactOccurred("rigid");
  };
  return (
    <section className="card-page">
      <NavLink to="/" className="back-btn">
        <img src={backArrow} alt="Назад" /> <span>Назад</span>
      </NavLink>
      <div className="plaque__logo">
        <img src={plaqueLogo} alt="plaque__logo" />
      </div>
      <div className="card-page__image">
        <img className="gradient" src={gradient} alt="gradient" />
        <img className="card-page-img" src={currentProductImg} alt="Card" />
      </div>

      <div className="card-page__content">
        <h2 className="h2">{products[id - 1].name}</h2>
        <p>{products[id - 1].description}</p>
        <hr />
        <p style={{ color: "red" }}>
          ВСЕ ЧТО НИЖЕ НУЖНО БУДЕТ ПОМЕНЯТЬ ДУМАЮ )))
        </p>
        <hr />
        <p>
          <b>Прибрежный кластер:</b> Олимпийский парк, Шоу «Поющие фонтаны»,
          обзорная экскурсия по Олимпийскому парку.
        </p>
        <p>
          <b>По желанию: минеральный</b> источник Чвижепсе, обед.
        </p>
        <p>
          <b>Канатная дорога:</b>Роза Хутор 2320 м, Роза Хутор 1200 м, Красная
          Поляна 2200 м, Красная Поляна 960 м
        </p>
      </div>
      <button className="btn" disabled>
        Взрослый: {products[id - 1].price} ₽ / Детский: ###
      </button>
      <button className="btn info-plaque">Отправление: ###</button>
      <NavLink to="/form/">
        <button onClick={vibrate} className="btn btn-main">
          Забронировать
        </button>
      </NavLink>
    </section>
  );
}

export default Card;

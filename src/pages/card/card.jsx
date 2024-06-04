import React from "react";

import cardImage1 from "../../assets/img/card1.jpg";
import plaqueLogo from "../../assets/img/plaque_logo.svg";
import gradient from "../../assets/img/gradient.png";
import { NavLink } from "react-router-dom";
function Card() {
  return (
    <section class="card-page">
      <div class="plaque__logo">
        <img src={plaqueLogo} alt="plaque__logo" />
      </div>
      <div class="card-page__image">
        <img class="gradient" src={gradient} alt="gradient" />
        <img class="card-page-img" src={cardImage1} alt="Card" />
      </div>

      <div class="card-page__content">
        <h2 class="h2">Роза Хутор 3 экскурсии по цене 1</h2>
        <p>
          Сочи (обзор), смотровая площадка на «ЗКурагК», Ущелье Ахцу, «Медвежий
          угол», Горное кафе, курорт Красная Поляна, курорт Роза Хутор, курорт
          Газпром, ОКЦ «Галактика».
        </p>
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
      <button class="btn" disabled>
        Взрослый: 2 500 ₽ / Детский: 2 100 ₽
      </button>
      <button class="btn info-plaque">Отправление: 5:30 </button>
      <NavLink to="/form/">
        <button class="btn btn-main">Забронировать</button>
      </NavLink>
    </section>
  );
}

export default Card;

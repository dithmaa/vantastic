import React from "react";

import nextBtn from "../../../assets/img/next-btn.svg";

import cardImage1 from "../../../assets/img/card1.png";
import { NavLink } from "react-router-dom";
function Card() {
  return (
    <div class="card">
      <div class="card__img">
        <img src={cardImage1} alt="Роза Хутор 3 экскурсии по цене 1" />
      </div>
      <div class="card-text-content">
        <h3 class="card__title">Роза Хутор 3 экскурсии по цене 1</h3>
        <p class="card__info">
          Сочи (обзор), смотровая площадка на «Skypark», Ущелье Ахцу, «Медвежий
          угол», Горное кафе, курорт Красная Поляна, курорт. Роза Хутор, курорт
          Газпром, ОКЦ «Галактика».
        </p>
        <div class="card-bottom">
          <div class="card__price">
            <span>2500</span>₽<p>За взрослого</p>
          </div>
          <NavLink to="/card/">
            <span class="card__next-btn">
              <img src={nextBtn} alt="next btn" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Card;

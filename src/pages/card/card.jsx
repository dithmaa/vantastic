import React, { useEffect, useState } from "react";

import cardImage1 from "../../assets/img/card1.jpg";
import plaqueLogo from "../../assets/img/plaque_logo.svg";
import gradient from "../../assets/img/gradient.png";
import backArrow from "../../assets/img/back-arrow.png";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import axios from "axios";
const tg = window.Telegram.WebApp;

function Card({ cardImages, products, info, userName, userID }) {
  const { id } = useParams();
  const [ref_id, setRef_id] = useState(0);

  const sendData = async (xxx) => {
    const token = "7315532670:AAGQJhx5vLtsiAgnkKESTF7rWKdmuBqmyDw";
    const chatId = "-4247931689";
    const text = `Переход на страницу: ${
      products[id - 1].name
    }, \nID пользователя: ${userID}, \nUsername: ${userName}, \n-----------\nКто пригласил: ${xxx}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
      } else {
        console.log("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://666305ae62966e20ef0b028a.mockapi.io/api/v1/users?tg_id=${userID}`
      )
      .then(({ data }) => {
        setTimeout(() => {
          sendData(data[0].ref_id);
        }, 500);
      });
  }, []);
  const [isPreloaderActive, setPreloaderActive] = useState(true);
  const [currentProductImg, setCurrentProductImg] = useState([]);

  const currentInfo = info[id - 1];
  useEffect(() => {
    setCurrentProductImg(cardImages[id - 1]);
  }, []);
  useEffect(() => {
    // Прокручиваем страницу вверх при монтировании компонента
    window.scrollTo(0, 0);
    setTimeout(() => {
      setPreloaderActive(false);
    }, 700);
  }, []);
  const vibrate = () => {
    tg.HapticFeedback.impactOccurred("rigid");
  };

  const InfoComponent = ({ text }) => {
    return <p dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <section className="card-page page-gap">
      <Preloader isActive={isPreloaderActive} />
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
        {/* <p>{products[id - 1].description}</p>{" "} */}
        <InfoComponent text={currentInfo ? currentInfo.text : ""} />
      </div>
      <button className="btn" disabled>
        Взрослый: {products[id - 1].price} ₽ / Детский: {products[id - 1].child}{" "}
        ₽
      </button>
      <button className="btn info-plaque">
        Отправление: {products[id - 1].departure}
      </button>
      <NavLink to={"/form/" + id}>
        <button onClick={vibrate} className="btn btn-main">
          Забронировать
        </button>
      </NavLink>
    </section>
  );
}

export default Card;

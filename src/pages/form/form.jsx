import React, { useEffect, useRef, useState } from "react";
import header2 from "../../assets/img/header2.jpg";
import calendarIcon from "../../assets/img/Calendar.svg";
import backArrow from "../../assets/img/back-arrow.png";
import { NavLink } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

import { useParams } from "react-router-dom";
import Sucess from "../success/sucess";

function Form({ userID, userName, refID, products }) {
  const { id } = useParams();
  console.log(id);
  const [selectedDate, setSelectedDate] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [adultVal, setAdultVal] = useState("");
  const [childVal, setChildVal] = useState("");

  // Поля ввода

  const handlePhoneVal = (e) => {
    // номер
    const inputValue = e.target.value;
    // Проверяем ввод на соответствие регулярному выражению
    const regex = /^[+\d]*$/;
    if (regex.test(inputValue)) {
      setPhoneVal(inputValue);
    }
  };
  const handleAdultVal = (event) => {
    setAdultVal(event.target.value);
  };
  const handleChildVal = (event) => {
    setChildVal(event.target.value);
  };
  const handleDateChange = (event) => {
    // дата
    setSelectedDate(event.target.value);
  };

  // Обработка формы

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Отправлено");

    const token = "7315532670:AAGQJhx5vLtsiAgnkKESTF7rWKdmuBqmyDw";
    const chatId = "-4208690097";
    const text = `🔥 Новый Заказ 🔥 - Telegram Bot \n ☎️ Номер телефона: ${phoneVal}\n 🤵‍♂️Взрослые: ${adultVal}\n🧒Дети: ${childVal}\n 📅 Желаемая дата: ${selectedDate}\n 😎Айди покупателя: ${userID}\n😎Username покупателя: ${userName}\n 👨‍💻Работник: ${refID}.\nЭкскурсия: ${
      products[id - 1].name
    }`;

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
        window.location.href = "/success";
      } else {
        console.log("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    setSelectedDate(year + "-" + month + "-" + day);
  }, []);
  const [isPreloaderActive, setPreloaderActive] = useState(true);
  useEffect(() => {
    // Прокручиваем страницу вверх при монтировании компонента
    window.scrollTo(0, 0);
    setTimeout(() => {
      setPreloaderActive(false);
    }, 900);
  }, []);

  return (
    <section className="card-page page-gap">
      <Preloader isActive={isPreloaderActive} />
      <NavLink to="/" className="back-btn">
        <img src={backArrow} alt="Назад" /> <span>Назад</span>
      </NavLink>
      <div className="card-page__image form-page__image">
        <img src={header2} alt="header2" />
      </div>
      <div className="container">
        <h3 className="form-title">Имя.</h3>
        <form className="form" action="#" onSubmit={handleSubmit}>
          <div className="form__item">
            <label className="form__title">Номер телефона:</label>
            <input
              maxLength={13}
              value={phoneVal}
              type="tel"
              placeholder="+7 (...) -...-..-.."
              onChange={handlePhoneVal}
            />
          </div>
          <div className="form__item">
            <label className="form__title">Колличество человек:</label>
            <div className="form__item-line flex">
              <input
                type="tel"
                onChange={handleAdultVal}
                maxLength={2}
                placeholder="Взрослые"
                value={adultVal}
              />
              <input
                type="tel"
                maxLength={2}
                placeholder="Дети"
                value={childVal}
                onChange={handleChildVal}
              />
            </div>
          </div>

          <label className="form__title">Желаемая дата:</label>
          <div className="date-input-container" style={{ width: "100%" }}>
            <span className="calendar-icon" style={{ paddingTop: "1px" }}>
              <img src={calendarIcon} alt="Calendar Icon" />
            </span>

            <input
              style={{ width: "100%" }}
              type="date"
              id="date-input"
              className="real-date-input"
              value={selectedDate}
              min="2024-06-02"
              max="2028-12-31"
              onChange={handleDateChange}
            />
          </div>

          <button className="form__btn" type={"submit"}>
            Свяжитесь со мной
          </button>
        </form>
      </div>
    </section>
  );
}

export default Form;

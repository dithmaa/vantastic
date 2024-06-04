import React, { useEffect, useRef, useState } from "react";
import header2 from "../../assets/img/header2.jpg";
import calendarIcon from "../../assets/img/Calendar.svg";
import backArrow from "../../assets/img/back-arrow.png";
import { NavLink } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

function Form() {
  const [phoneVal, setPhoneVal] = useState("");
  // Обработчик события скролла страницы

  const handlePhoneVal = (e) => {
    const inputValue = e.target.value;
    // Проверяем ввод на соответствие регулярному выражению
    const regex = /^[+\d]*$/;
    if (regex.test(inputValue)) {
      setPhoneVal(inputValue);
    }
  };
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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

  // Скрытие клавы

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId); // Очищаем предыдущий таймаут, если он был установлен
      const inputElements = document.querySelectorAll("input, textarea");
      const hasFocusedElement = Array.from(inputElements).some(
        (element) => element === document.activeElement
      );

      if (hasFocusedElement) {
        // Устанавливаем таймаут перед скрытием клавиатуры
        timeoutId = setTimeout(() => {
          document.activeElement.blur();
        }, 200); // Измените это значение на необходимое вам
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId); // Очищаем таймаут при размонтировании компонента
    };
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
        <h3 className="form-title">Имя</h3>
        <form className="form" action="#">
          <div className="form__item">
            <label className="form__title">Номер телефона:</label>
            <input
              maxLength={13}
              value={phoneVal}
              type="tel"
              placeholder="+7 (...)-...-..-.."
              onChange={handlePhoneVal}
            />
          </div>
          <div className="form__item">
            <label className="form__title">Колличество человек:</label>
            <div className="form__item-line flex">
              <input type="tel" maxLength={2} placeholder="Взрослые" />
              <input type="tel" maxLength={2} placeholder="Дети" />
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

          <button className="form__btn">Свяжитесь со мной</button>
        </form>
      </div>
    </section>
  );
}

export default Form;

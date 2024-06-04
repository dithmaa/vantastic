import React, { useEffect, useRef, useState } from "react";
import header2 from "../../assets/img/header2.jpg";
import calendarIcon from "../../assets/img/Calendar.svg";

function Form() {
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

  return (
    <section className="card-page">
      <div className="card-page__image">
        <img src={header2} alt="header2" />
      </div>
      <div className="container">
        <h3 className="form-title">Имя</h3>
        <form className="form" action="#">
          <div className="form__item">
            <label className="form__title">Номер телефона:</label>
            <input type="text" placeholder="+7 (...)-...-..-.." />
          </div>
          <div className="form__item">
            <label className="form__title">Колличество человек:</label>
            <div className="form__item-line flex">
              <input type="text" placeholder="Взрослые" />
              <input type="text" placeholder="Дети" />
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

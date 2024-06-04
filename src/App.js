import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CardPage from "./pages/card/card";
import Form from "./pages/form/form";
import { useEffect, useState } from "react";
import { products } from "./products";
import Preloader from "./components/Preloader/Preloader";

const tg = window.Telegram.WebApp;
function App() {
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
        }, 100); // Устанавливаем время ожидания, после которого будет скрыта клавиатура
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId); // Очищаем таймаут при размонтировании компонента
    };
  }, []);
  const [isPreloaderActive, setPreloaderActive] = useState(true);
  useEffect(() => {
    tg.ready();
    tg.isClosingConfirmationEnabled = true;
    setTimeout(() => {
      tg.expand();
    }, 200);

    setTimeout(() => {
      setPreloaderActive(false);
    }, 700);
  }, []);

  const cardImages = [];

  for (let i = 1; i <= 16; i++) {
    cardImages.push(require(`./assets/img/card${i}.jpg`));
  }
  return (
    <div className="App">
      <Preloader isActive={isPreloaderActive} />
      <Routes>
        <Route
          path="/"
          element={<Cards products={products} cardImages={cardImages} />}
        />
        <Route
          path="/card/:id"
          element={<CardPage products={products} cardImages={cardImages} />}
        />
        <Route path="/form/" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

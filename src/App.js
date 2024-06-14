import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CardPage from "./pages/card/card";
import Form from "./pages/form/form";
import { useEffect, useState } from "react";
import { products } from "./products";
import { info } from "./describtion";
import Preloader from "./components/Preloader/Preloader";
import Sucess from "./pages/success/sucess";

const tg = window.Telegram.WebApp;
function App() {
  const [isPreloaderActive, setPreloaderActive] = useState(true);
  // TG API Data
  const [userID, setUserID] = useState(tg.initDataUnsafe?.user?.id || 0);
  const [refID, setRefID] = useState(
    Number(tg.initDataUnsafe?.start_param?.slice(3)) || "none"
  );
  const [userName, setUserName] = useState(
    tg.initDataUnsafe?.user?.username || "none"
  );
  useEffect(() => {
    tg.ready(); // подготовка тг бота
    tg.isClosingConfirmationEnabled = true; // вопрос перед закрытием приложения
    setTimeout(() => {
      tg.expand(); // открытие на всю высоту
      setTimeout(() => {
        setPreloaderActive(false); // скрытие прелоадера
      });
    }, 200);
  }, []);

  // получаем картинки
  const cardImages = [];

  for (let i = 1; i <= 14; i++) {
    cardImages.push(require(`./assets/img/card${i}.jpg`));
  }
  // приложение
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
          element={
            <CardPage info={info} products={products} cardImages={cardImages} />
          }
        />
        <Route
          path="/form/:id"
          element={<Form userID={userID} refID={refID} userName={userName} />}
        />
        <Route path="/success/" element={<Sucess />} />
      </Routes>
    </div>
  );
}

export default App;

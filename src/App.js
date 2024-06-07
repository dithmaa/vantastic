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
      <div style={{ color: "red" }}>
        Ref ID: {tg.initDataUnsafe.start_param}
      </div>
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

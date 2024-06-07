import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CardPage from "./pages/card/card";
import Form from "./pages/form/form";
import { useEffect, useState } from "react";
import { products } from "./products";
import Preloader from "./components/Preloader/Preloader";
import axios from "axios";

const tg = window.Telegram.WebApp;
function App() {
  const [isPreloaderActive, setPreloaderActive] = useState(true);
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [userID, setUserID] = useState(tg.initDataUnsafe?.user?.id || 2020);
  const [refID, setRefID] = useState(
    Number(tg.initDataUnsafe?.user?.id.slice(3)) || 999
  );
  const [userName, setUserName] = useState(
    tg.initDataUnsafe?.user?.username || "noname"
  );
  useEffect(() => {
    tg.ready();
    tg.isClosingConfirmationEnabled = true;
    setTimeout(() => {
      tg.expand();
    }, 200);
  }, []);
  const getUser = async () => {
    console.log("is getting...");
    const user = await axios
      .get(
        `https://666305ae62966e20ef0b028a.mockapi.io/api/v1/users?tg_id=${userID}`
      )
      .then(({ data }) => {
        alert("Пользователь найден");
        setUser(data[0]);
        console.log(data[0]);

        setTimeout(() => {
          setPreloaderActive(false);
        }, 700);
      })
      .catch((e) => {
        const newUser = {
          tg_id: userID,
          tg_username: userName,
          ref_id: "none",
        };
        alert("Пользователь не найден");
        axios.post(
          `https://666305ae62966e20ef0b028a.mockapi.io/api/v1/users`,
          newUser
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const cardImages = [];

  for (let i = 1; i <= 16; i++) {
    cardImages.push(require(`./assets/img/card${i}.jpg`));
  }
  return (
    <div className="App">
      <div style={{ color: "red" }}>My ID: {userID}</div>
      <div style={{ color: "red" }}>Username: {userName}</div>
      <div style={{ color: "red" }}>RefID: {refID}</div>
      <Preloader isActive={isPreloaderActive} />
      {isAuth ? (
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
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

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
  const [refID, setRefID] = useState();
  const [userName, setUserName] = useState(
    tg.initDataUnsafe?.user?.username || "none"
  );
  const [refUsername, setRefUsername] = useState();
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
        setUser(data[0]);
        console.log(data[0]);

        setRefID(data[0].ref_id);

        setTimeout(() => {
          axios
            .get(
              `https://666305ae62966e20ef0b028a.mockapi.io/api/v1/users?tg_id=${refID}`
            )
            .then(({ data }) => {
              console.log(data[0].tg_username);
              setRefUsername(data[0].tg_username);
            })
            .catch((e) => {
              // alert("Не правильная реферальная ссылка");
            });
          setAuth(true);
          setPreloaderActive(false);
        }, 700);
      })
      .catch((e) => {
        const refIdLink =
          Number(tg.initDataUnsafe?.start_param?.slice(3)) || "none";
        const newUser = {
          tg_id: userID,
          tg_username: userName,
          ref_id: refIdLink,
        };
        axios
          .post(
            `https://666305ae62966e20ef0b028a.mockapi.io/api/v1/users`,
            newUser
          )
          .then((resp) => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
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
      <Preloader isActive={isPreloaderActive} />
      {isAuth ? (
        <Routes>
          <Route
            path="/"
            element={
              <Cards
                refUsername={refUsername}
                userID={userID}
                refID={refID}
                userName={userName}
                products={products}
                cardImages={cardImages}
              />
            }
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

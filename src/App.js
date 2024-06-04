import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CardPage from "./pages/card/card";
import Form from "./pages/form/form";
import { useEffect } from "react";

const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready();
    setTimeout(() => {
      tg.expand();
    }, 200);
  }, []);
  return (
    <div className="App">
      lorem lorem
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/card/" element={<CardPage />} />
        <Route path="/form/" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

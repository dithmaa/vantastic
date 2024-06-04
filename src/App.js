import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CardPage from "./pages/card/card";
import Form from "./pages/form/form";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/card/" element={<CardPage />} />
        <Route path="/form/" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

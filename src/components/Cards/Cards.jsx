import React from "react";
import Card from "./Card/Card";
import headerBg from "../../assets/img/header.jpg";

function Cards() {
  return (
    <>
      <header
        class="header"
        style={{ backgroundImage: `url(${headerBg}` }}
      ></header>
      <div class="container">
        <section class="cards">
          <Card />
          <Card />
        </section>
      </div>
    </>
  );
}

export default Cards;

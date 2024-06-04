import React from "react";
import Card from "./Card/Card";
import headerBg from "../../assets/img/header.jpg";

function Cards({ products, cardImages }) {
  return (
    <>
      <header
        className="header"
        style={{ backgroundImage: `url(${headerBg}` }}
      ></header>
      <div className="container">
        <section className="cards">
          {products.map((product, key) => {
            return <Card picture={cardImages[key]} {...product} key={key} />;
          })}
        </section>
      </div>
    </>
  );
}

export default Cards;

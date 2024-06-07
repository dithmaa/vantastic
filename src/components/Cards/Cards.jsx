import React from "react";
import Card from "./Card/Card";
import headerBg from "../../assets/img/header.jpg";
//homepage
function Cards({ products, cardImages, userID, userName, refID }) {
  return (
    <>
      <header
        className="header"
        style={{ backgroundImage: `url(${headerBg}` }}
      ></header>
      <div style={{ padding: "20px" }}>
        <div style={{ color: "#9999d3" }}>
          <b>My ID:</b> {userID}
        </div>
        <div style={{ color: "#9999d3" }}>
          <b>Username: </b> {userName}
        </div>
        <div style={{ color: "#9999d3" }}>
          <b>RefID: </b> {refID}
        </div>
      </div>
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

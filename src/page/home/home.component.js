import React, { useState } from "react";
import "./home.styles.css";
import AutumnImg from "../../img/autumn.jpg";
import Form from "../../component/form/form.component";
import Loading from "../../component/loading/loading.component";
const Home = () => {
  const [active, setActive] = useState("home");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLoading = (stt) => {
    setLoading(stt);
  };
  return (
    <div className="home">
      {loading && <Loading title="SOnbk" />}
      {/* <div className="background-image"></div> */}
      <div className="home-inner">
        <div className="right-side">
          <div className="nav-tab">
            <a
              className={`nav-link ${active === "home" ? "active" : ""}`}
              onClick={() => {
                setActive("home");
              }}
            >
              Home
            </a>
            <a
              className={`nav-link ${active === "confession" ? "active" : ""}`}
              onClick={() => {
                setActive("confession");
              }}
            >
              Confession
            </a>
            <a
              className={`nav-link ${active === "radio" ? "active" : ""}`}
              onClick={() => {
                setActive("radio");
              }}
            >
              Radio
            </a>
            <a
              className={`nav-link ${active === "contact" ? "active" : ""}`}
              onClick={() => {
                setActive("contact");
              }}
            >
              Contact
            </a>
          </div>
          <div className="nav-contents-block">
            <div
              className={`nav-content ${active === "home" ? "active" : ""}`}
            >
              <h3 className="content-header">UED Confession.</h3>
              <span className="description">
                Tôi chờ từ mùa hạ, chờ hết cả thu vàng, chờ mùa đông trút lá,
                chỉ để em ghé ngang.
              </span>
            </div>
            <div
              className={`nav-content ${active === "confession" ? "active" : ""}`}
            >
              <h3 className="content-header">
                Summer full of praise and favor.
              </h3>
              <span className="description">
                Tôi chờ từ mùa hạ, chờ hết cả thu vàng, chờ mùa đông trút lá,
                chỉ để em ghé ngang.
              </span>
            </div>
            <div
              className={`nav-content ${active === "radio" ? "active" : ""}`}
            >
              <h3 className="content-header">
                Autumn full of praise and favor.
              </h3>
              <span className="description">
                Tôi chờ từ mùa hạ, chờ hết cả thu vàng, chờ mùa đông trút lá,
                chỉ để em ghé ngang.
              </span>
            </div>
            <div
              className={`nav-content ${active === "contact" ? "active" : ""}`}
            >
              <h3 className="content-header">
                Winter full of praise and favor.
              </h3>
              <span className="description">
                Tôi chờ từ mùa hạ, chờ hết cả thu vàng, chờ mùa đông trút lá,
                chỉ để em ghé ngang.
              </span>
            </div>
            <div
              onClick={() => setOpenForm(true)}
              className="btn btn-send-post"
            >
              Gửi bài viết
            </div>
          </div>
        </div>
        <div className="left-side">
          <img src={AutumnImg} alt="autumn image" />
        </div>
      </div>
      {openForm && (
        <Form
          setLoading={(stt) => handleLoading(stt)}
          handleClick={() => setOpenForm(false)}
        />
      )}
    </div>
  );
};
export default Home;

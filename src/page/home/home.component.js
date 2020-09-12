import React, { useState } from "react";
import "./home.styles.css";
import heart from "../../img/heart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Form from "../../component/form/form.component";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="home">
      <div className="name">
        <span>C</span>
        <span>O</span>
        <span>N</span>
        <span>F</span>
        <span>E</span>
        <span>S</span>
        <span>S</span>
        <span>I</span>
        <span>O</span>
        <span>N</span>
        <img className="heart" src={heart} alt="Heart"></img>
        <p className="job">Su pham Da Nang</p>
      </div>
      {isOpen ? <Form handleClick={handleClick} /> : ""}
      <div className="send" onClick={handleClick}>
        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Tạo bài viết !
      </div>
    </div>
  );
};
export default Home;

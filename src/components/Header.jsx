// import { useState } from "react";
import logoImg from "../assets/logo.jpg";
import Buttons from "./Buttons";
import SearchMeal from "./SearchMeal";

function Header({ noOfItems, showCartCallback, searchCallback }) {
  // const [showAuthForm, setShowAuthForm] = useState(false);
 
  return (
    <div>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="Logo Image" />
          <h1>React Food</h1>
        </div>
        <SearchMeal searchCallback={searchCallback} />
        <nav>
          <Buttons
            textOnly={true}
            buttonTxt={`Cart (${noOfItems})`}
            onClickCallback={showCartCallback}
          />
        </nav>
      </header>
    </div>
  );
}
export default Header;

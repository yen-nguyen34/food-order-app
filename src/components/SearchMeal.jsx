import { useState } from "react";

function SearchMeal({ searchCallback }) {
  const [searchMeal, setSearchMeal] = useState("");
  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search?keyword=${searchMeal}`
      );
      const resData = await response.json();

      searchCallback(resData);
      console.log(resData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div id="search-container">
      <input
        type="text"
        placeholder="Search Food ..."
        onChange={(e) => setSearchMeal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getData();
          }
        }}
      />
      <button type="submit" onClick={getData}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}
export default SearchMeal;

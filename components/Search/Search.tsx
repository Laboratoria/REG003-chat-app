import { NextPage } from "next";
import React, { useState } from "react";

const SearchSide: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const onSearch = (e: any) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  return (
    <section className="container-search">
      <input
        type="text"
        className="input-search"
        placeholder="Buscar"
        onChange={onSearch}
        value={inputValue}
      />
    </section>
  );
};
export default SearchSide;

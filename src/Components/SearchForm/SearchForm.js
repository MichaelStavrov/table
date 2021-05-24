import { useState } from "react";
import { Button } from "../Button/Button";
import s from "./SearchForm.module.css";

export function SearchForm({ data, setFilteredData }) {
  const [value, setValue] = useState("");
  const [notAvailable, setNotAvailable] = useState(false);

  function searchSubString(str, value) {
    return str.toLowerCase().includes(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const filteredData = data.filter(
      (item) =>
        searchSubString(item.firstName, value) ||
        searchSubString(item.lastName, value) ||
        searchSubString(item.email, value)
    );
    if (filteredData.length === 0) {
      setNotAvailable(true);
      setTimeout(() => {
        setNotAvailable(false);
      }, 3000);
      return [];
    } else {
      setFilteredData(filteredData);
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setValue(value);
    if (value === "") {
      setFilteredData(data);
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label} htmlFor="searchForm">
        {notAvailable && (
          <div className={s.warningMessage}>
            По вашему запросу ничего не найдено.
          </div>
        )}
        <input
          className={s.input}
          type="text"
          name="searchForm"
          id="searchForm"
          value={value}
          onChange={handleChange}
        />
      </label>
      <div className={s.btnSearch}>
        <Button type="submit">Найти</Button>
      </div>
    </form>
  );
}

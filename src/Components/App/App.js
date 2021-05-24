import { useState, useEffect } from "react";
import s from "./App.module.css";
import { Table } from "../Table/Table";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { fetchData } from "../../api";
import { Paginator } from "../Paginator/Paginator";
import { AddForm } from "../AddForm/AddForm";
import { SearchForm } from "../SearchForm/SearchForm";
import { Details } from "../Details/Details";

export function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showAddForm, setShowAddFrom] = useState(false);
  const [disabledBtnSmallUrl, setDisabledBtnSmallUrl] = useState(false);
  const [disabledBtnLargeUrl, setDisabledBtnLargeUrl] = useState(false);

  useEffect(() => {
    if (url) {
      setLoading(true);
      setDisabled(true);
      fetchData(url)
        .then((data) => {
          setData(data);
          setLoading(false);
          setDisabled(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, [url]);

  useEffect(() => {
    setSortedData(data);
    setFilteredData(data);
  }, [data]);

  function handleBtnFetchDataClick(e) {
    const { name } = e.target;
    if (name === "btnSmallUrl") {
      setDisabledBtnSmallUrl(true);
      setDisabledBtnLargeUrl(false);
      setUrl(
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
    }
    if (name === "btnLargeUrl") {
      setDisabledBtnSmallUrl(false);
      setDisabledBtnLargeUrl(true);
      setUrl(
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
    }
  }

  const tableTitles = [
    { id: 1, name: "id" },
    { id: 2, name: "firstName" },
    { id: 3, name: "lastName" },
    { id: 4, name: "email" },
    { id: 5, name: "phone" },
  ];

  if (error) {
    return <div className={s.error}>Error</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.modeSelector}>
          <div className={s.btnSmallUrl}>
            <Button
              disabled={disabledBtnSmallUrl || disabled}
              type="button"
              name="btnSmallUrl"
              onClick={handleBtnFetchDataClick}
            >
              32 items
            </Button>
          </div>
          <div className={s.btnLargeUrl}>
            <Button
              disabled={disabledBtnLargeUrl || disabled}
              type="button"
              name="btnLargeUrl"
              onClick={handleBtnFetchDataClick}
            >
              1000 items
            </Button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className={s.content}>
            {data.length > 0 && (
              <div className={s.forms}>
                <div className={s.addBtn}>
                  <Button
                    type="button"
                    onClick={() => setShowAddFrom((prev) => !prev)}
                  >
                    {showAddForm ? "Скрыть" : "Добавить в таблицу"}
                  </Button>
                </div>
                {showAddForm && (
                  <div className={s.addForm}>
                    <AddForm setData={setData} />
                  </div>
                )}
                <div className={s.searchForm}>
                  <SearchForm data={data} setFilteredData={setFilteredData} />
                </div>
              </div>
            )}
            {data.length > 0 && (
              <div className={s.table}>
                <Table
                  titles={tableTitles}
                  data={data}
                  filteredData={filteredData}
                  displayedData={displayedData}
                  setSortedData={setSortedData}
                  setSelectedRow={setSelectedRow}
                />
              </div>
            )}
            <div className={s.paginator}>
              <Paginator
                pageSize={50}
                data={sortedData}
                setDisplayedData={setDisplayedData}
              />
            </div>
            {Object.keys(selectedRow).length > 0 && (
              <div className={s.details}>
                <Details data={selectedRow} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import s from "./Paginator.module.css";
import { Button } from "../Button/Button";

export function Paginator({ pageSize, data, setDisplayedData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startNumber, setStartNumber] = useState(0);
  const [lastNumber, setLastNumber] = useState(12);
  const [pages, setPages] = useState([]);
  const [portionPages, setPortionPages] = useState([]);

  const pagesCount = Math.ceil(data.length / pageSize);
  const PORTION_COUNT = 12;
  const half = PORTION_COUNT / 2;

  useEffect(() => {
    let start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    if (data.length === 0) {
      start = 0;
    }
    setDisplayedData(data.slice(start, end));
  }, [data, pageSize, currentPage, setDisplayedData]);

  const pagesMemo = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return pages;
  }, [pagesCount]);

  useEffect(() => {
    setPages(pagesMemo);
  }, [pagesMemo]);

  useEffect(() => {
    setPortionPages(pages.slice(startNumber, lastNumber));
  }, [setPortionPages, pages, startNumber, lastNumber]);

  useEffect(() => {
    if (currentPage > half) {
      setStartNumber(currentPage - half);
      setLastNumber(currentPage + half);
    }
    if (currentPage > pagesCount - half) {
      setStartNumber(pagesCount - PORTION_COUNT);
      setLastNumber(pagesCount);
    }
    if (currentPage <= half) {
      setStartNumber(0);
      setLastNumber(PORTION_COUNT);
    }
  }, [currentPage, pagesCount, half]);

  const btnSyles = {
    padding: "3px 7px",
    fontSize: "12px",
    width: "40px",
    height: "20px",
    fontWeight: 400,
  };

  return (
    <>
      {pagesCount > 1 && (
        <div className={s.paginator}>
          <Button
            onClick={() =>
              setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
            }
            disabled={currentPage === 1}
            style={btnSyles}
            name="btnBack"
          >
            {"<"}
          </Button>
          <div className={s.numbers}>
            {portionPages.map((page) => (
              <span
                className={cn(s.page, {
                  [s.currentPage]: currentPage === page,
                })}
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            ))}
          </div>
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                prev === pages.length ? prev : prev + 1
              )
            }
            style={btnSyles}
            disabled={currentPage === pages.length}
          >
            {">"}
          </Button>
        </div>
      )}
    </>
  );
}

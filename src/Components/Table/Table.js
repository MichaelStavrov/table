import { useEffect, useState } from "react";
import cn from "classnames";
import s from "./Table.module.css";

export function Table({
  titles,
  data,
  filteredData,
  displayedData,
  setSortedData,
  setSelectedRow
}) {
  const [sortedMode, setSortedMode] = useState("asc");
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    setSortedData(filteredData);
  }, [setSortedData, filteredData]);

  function handleTitleClick(name, id) {
    const copyData = [...filteredData];
    const result = copyData.sort((a, b) => {
      if (typeof a[name] === "string" || typeof b[name] === "string") {
        const aLow = a[name].toLowerCase();
        const bLow = b[name].toLowerCase();
        if (aLow < bLow) {
          return sortedMode === "asc" ? -1 : 1;
        }
        if (aLow > bLow) {
          return sortedMode === "asc" ? 1 : -1;
        }
      } else {
        return sortedMode === "asc" ? a[name] - b[name] : b[name] - a[name];
      }
      return 0;
    });
    setSortedData(result);
    setSortedMode(sortedMode === "asc" ? "desc" : "asc");
    setSelectedCell(id);
  }

  const tableData = displayedData.length === 0 ? data : displayedData;

  return (
    <table className={s.table} border="1" cellSpacing="0">
      <thead>
        <tr className={s.row}>
          {titles.map(({ id, name }) => (
            <th
              className={cn(s.cell, s.thCell, {
                [s.thCellAsc]: selectedCell === id && sortedMode === "asc",
                [s.thCellDesc]: selectedCell === id && sortedMode === "desc",
              })}
              key={id}
              onClick={() => handleTitleClick(name, id)}
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map(({ id, firstName, lastName, email, phone, ...props }) => (
          <tr className={s.row} key={id + phone} onClick={() => setSelectedRow({ id, firstName, lastName, email, phone, ...props })}>
            <td className={s.cell}>{id}</td>
            <td className={s.cell}>{firstName}</td>
            <td className={s.cell}>{lastName}</td>
            <td className={s.cell}>{email}</td>
            <td className={s.cell}>{phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

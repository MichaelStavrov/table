import s from "./Loader.module.css";

export function Loader() {
  return (
    <div className={s.loader}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div className={s.item} key={i}></div>
      ))}
    </div>
  );
}

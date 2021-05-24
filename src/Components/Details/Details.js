import s from "./Details.module.css";

export function Details({ data }) {
  console.log('render');
  const { address, description, firstName, lastName } = data;
  return (
    <div className={s.details}>
      <p>
        Выбран пользователь <b>{firstName + " " + lastName}</b>
      </p>
      <p>
        Описание: <br />
        <textarea defaultValue={description} cols={40} />
      </p>
      {address && (
        <>
          <p>
            Адрес проживания: <b>{address.streetAddress}</b>
          </p>
          <p>
            Город: <b>{address.city}</b>
          </p>
          <p>
            Провинция/штат: <b>{address.state}</b>
          </p>
          <p>
            Индекс: <b>{address.zip}</b>
          </p>
        </>
      )}
    </div>
  );
}

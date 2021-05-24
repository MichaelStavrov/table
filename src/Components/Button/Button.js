import cn from "classnames";
import s from "./Button.module.css";

export function Button({ children, onClick, style, disabled, ...props }) {
  return (
    <button
      className={cn({
        [s.button]: true,
        [s.buttonDisabled]: disabled,
      })}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

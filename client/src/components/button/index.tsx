import React from "react";
import LoaderSpinner from "../LoaderSpinner";

interface propsTypes {
  text?: string | React.ReactElement;
  isLoader?: boolean;
  padding?: string;
  background?: string;
  spinnerColor?: string;
}
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & propsTypes;

const Button: React.FC<Props> = ({
  text,
  type,
  className,
  color = "text-yellow-50",
  disabled,
  padding = "px-5 py-2.5",
  isLoader = true,
  spinnerColor = "#fff",
  background = "bg-mainColor",
  ...props
}) => {
  return (
    <button
      {...{ type, disabled, ...props }}
      className={`flex max-w-full justify-center rounded-[3.5px] ${color} text-sm mx-auto ${background} ${padding} disabled:bg-opacity-60 disabled:cursor-not-allowed ${className} hover:bg-transparent border-[1px] border-mainColor hover:text-mainColor`}
    >
      {text}
      {isLoader && disabled && <LoaderSpinner color={spinnerColor} />}
    </button>
  );
};

export default Button;

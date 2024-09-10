import React, { InputHTMLAttributes, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

interface propsType extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, propsType>(
  (
    { type = "text", name = "", id, className, icon = true, error, ...props },
    ref
  ) => {
    const [newType, setNewType] = useState(type);
    return (
      <>
        <div className="mt-2 relative ">
          <span className="relative">
            <input
              {...{ name, id, ...props, ref }}
              type={newType}
              className={`block w-full rounded-[5px] border border-gray px-4 py-2.5 focus:ring-0 focus:outline-none text-xs text-black ${className}`}
            />
            {type === "password" && icon && (
              <span
                className="absolute top-[50%] right-0 translate-y-[-50%] h-full grid place-items-center cursor-pointer px-4 z-10 "
                onClick={() =>
                  setNewType(newType === "password" ? "text" : "password")
                }
              >
                {newType !== "text" ? <BsEyeFill /> : <BsEyeSlashFill />}
              </span>
            )}
          </span>
          {error && (
            <p className="text-red-600 capitalize text-xs my-1 ">{error}</p>
          )}
        </div>
      </>
    );
  }
);

export default Input;

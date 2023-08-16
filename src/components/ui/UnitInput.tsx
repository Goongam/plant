import { useState, RefObject, forwardRef } from "react";
import StyleInput from "./StyleInput";

interface Props {
  type?: "text" | "number";
  placeholder?: string;
  style?: string;
  unit: string;
  initValue: string;
  text?: string;
  required?: boolean;
}

function UnitInput(
  {
    type = "text",
    placeholder,
    style,
    unit,
    initValue,
    text,
    required = false,
  }: // ref,
  Props,
  ref: any
) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`flex justify-between items-center pr-2 ${
        focus && "border border-sky-300"
      } ${style}`}
    >
      {text && <div className="w-28 text-gray-400 pl-1">{text}</div>}
      <input
        className={`w-full h-10 outline-none pl-1 `}
        type={type}
        // value={initValue}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={ref}
        required={required}
      ></input>
      <p className="text-gray-400">{unit}</p>
    </div>
  );
}

const forwardedRefInput = forwardRef(UnitInput);
export default forwardedRefInput;

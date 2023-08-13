import { useState } from "react";
import StyleInput from "./StyleInput";

interface Props {
  type?: "text" | "number";
  placeholder?: string;
  style?: string;
  unit: string;
}

export default function UnitInput({
  type = "text",
  placeholder,
  style,
  unit,
}: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`flex justify-between items-center pr-2 ${
        focus && "border border-sky-300"
      }`}
    >
      <input
        className={`w-full h-10 outline-none  pl-1 ${style} `}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></input>
      <p className="text-gray-400">{unit}</p>
    </div>
  );
}

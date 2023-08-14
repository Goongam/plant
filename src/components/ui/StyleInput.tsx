import { RefObject, forwardRef } from "react";
interface Props {
  type?: "text" | "number";
  placeholder?: string;
  style?: string;
  required?: boolean;
  ref: RefObject<HTMLInputElement>;
}
function StyleInput(
  {
    type = "text",
    placeholder,
    style,
    required,
  }: // ref,
  Props,
  ref: any
) {
  return (
    <input
      className={`w-full h-10 outline-none focus:border focus:border-sky-300 pl-1 ${style}`}
      type={type}
      placeholder={placeholder}
      required={required}
      ref={ref}
    ></input>
  );
}

const forwardedRefInput = forwardRef(StyleInput);
export default forwardedRefInput;

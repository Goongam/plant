interface Props {
  type?: "text" | "number";
  placeholder?: string;
  style?: string;
}
export default function StyleInput({
  type = "text",
  placeholder,
  style,
}: Props) {
  return (
    <input
      className={`w-full h-10 outline-none focus:border focus:border-sky-300 pl-1 ${style}`}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}

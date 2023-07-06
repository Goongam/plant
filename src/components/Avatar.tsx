interface Props {
  image: string;
  size?: "xs" | "s" | "m" | "l";
  onClick?: () => void;
  customClass?: string;
}
export default function Avatar({
  image,
  size = "m",
  onClick,
  customClass,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="avatar"
      className={`${getSize(size)} rounded-full ${customClass}`}
      onClick={onClick}
    />
  );
}

function getSize(size: string) {
  switch (size) {
    case "xs":
      return "w-5 h-5";
    case "s":
      return "w-10 h-10";
    case "m":
      return "w-16 h-16";
    case "l":
      return "w-20 h-20";
  }
}

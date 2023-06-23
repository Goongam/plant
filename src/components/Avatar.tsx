interface Props {
  image: string;
  size?: "s" | "m" | "l";
  onClick?: () => void;
}
export default function Avatar({ image, size = "m", onClick }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="avatar"
      className={`${getSize(size)} rounded-full`}
      onClick={onClick}
    />
  );
}

function getSize(size: string) {
  switch (size) {
    case "s":
      return "w-10 h-10";
    case "m":
      return "w-16 h-16";
    case "l":
      return "w-20 h-20";
  }
}

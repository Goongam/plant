import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";
import MoonLoader from "react-spinners/MoonLoader";
import BeatLoader from "react-spinners/BeatLoader";
import GridLoader from "react-spinners/GridLoader";

type Loader = "Clip" | "Pulse" | "Moon" | "Beat" | "GridLoader";
interface Props {
  type?: Loader;
  size?: number;
  customStyle?: string;
  color?: string;
}

function getLoader(type: Loader, size: number, color: string | undefined) {
  switch (type) {
    case "Clip":
      return <ClipLoader size={size} color={color ?? "#000000"} />;
    case "Moon":
      return <MoonLoader size={size} color={color ?? "#000000"} />;
    case "Pulse":
      return <PulseLoader size={size} color={color ?? "#000000"} />;
    case "GridLoader":
      return <GridLoader size={size} color={color ?? "#000000"} />;
    default:
      return <BeatLoader size={size} color={color ?? "#000000"} />;
  }
}

export default function Loading({
  type = "Beat",
  size = 50,
  customStyle,
  color,
}: Props) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${customStyle}`}
    >
      {getLoader(type, size, color)}
    </div>
  );
}

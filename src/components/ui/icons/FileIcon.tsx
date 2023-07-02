import { FaPhotoVideo } from "react-icons/fa";

interface Props {
  size?: "s" | "m";
}
export default function FilesIcon({ size = "m" }: Props) {
  return size === "s" ? (
    <FaPhotoVideo className="w-10 h-10 text-gray-300" />
  ) : (
    <FaPhotoVideo className="w-20 h-20 text-gray-300" />
  );
}

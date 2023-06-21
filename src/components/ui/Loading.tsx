import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center mt-4">
      <ClipLoader size={50} />
    </div>
  );
}

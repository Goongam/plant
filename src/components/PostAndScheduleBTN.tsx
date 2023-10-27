interface Props {
  showContainer: "post" | "schedule";
  setShowContainer: (value: "post" | "schedule") => void;
}
export default function PostAndScheduleBTN({
  setShowContainer,
  showContainer,
}: Props) {
  return (
    <>
      <button
        className={`flex-1 border-t border-gray m-2 py-3 ${
          showContainer === "post" && "border-black"
        }`}
        onClick={() => setShowContainer("post")}
      >
        포스트
      </button>
      <button
        className={`flex-1 border-t border-gray m-2 py-3 ${
          showContainer === "schedule" && "border-black"
        }`}
        onClick={() => setShowContainer("schedule")}
      >
        일정
      </button>
    </>
  );
}

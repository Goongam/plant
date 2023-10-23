export interface BannerData {
  message: string;
  state: "success" | "error";
}

export default function Banner({
  banner: { state, message },
}: {
  banner: BannerData;
}) {
  const isSuccess = state === "success";
  //   const icon = isSuccess ? "V" : "X";

  return (
    <>
      <p
        className={`p-2 w-full text-center rounded-xl ${
          isSuccess ? "bg-green-400" : "bg-red-500"
        }`}
      >
        {/* {icon} */}
        {message}
      </p>
    </>
  );
}

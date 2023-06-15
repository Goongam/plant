import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-16 border-b-[1px] border-neutral-400 sticky top-0">
      <div className="flex justify-between items-center w-full max-w-screen-xl">
        <Image src="/vercel.svg" alt="logo" width={150} height={100} />
        <span>로그인</span>
      </div>
    </header>
  );
}

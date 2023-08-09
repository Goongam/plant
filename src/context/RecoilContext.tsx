"use client";
import { RecoilRoot } from "recoil";

export default function RecoilContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </RecoilRoot>
  );
}

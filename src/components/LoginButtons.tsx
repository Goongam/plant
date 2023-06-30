"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { useParams } from "next/navigation";

export default function LoginButtons({
  providers,
  callbackUrl,
}: {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        return (
          <button
            key={id}
            onClick={() => signIn(id, { callbackUrl })}
            className="border border-black rounded-md p-3"
          >{`${name}(으)로 로그인`}</button>
        );
      })}
    </>
  );
}

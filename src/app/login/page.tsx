import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { GetServerSidePropsContext, Metadata } from "next";
import { AuthOption } from "../api/auth/[...nextauth]/route";
import LoginButtons from "@/components/LoginButtons";

export const metadata: Metadata = {
  title: "Signin",
  description: "Sign up",
};

export default async function Login({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const session = await getServerSession(AuthOption);

  if (session) {
    redirect("/");
  }

  const providers = await getProviders();

  if (!providers) return;
  return (
    <section className="flex justify-center mt-24">
      <LoginButtons
        providers={providers}
        callbackUrl={searchParams.callbackUrl ?? "/"}
      />
    </section>
  );
}

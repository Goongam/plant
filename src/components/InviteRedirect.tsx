import { redirect } from "next/navigation";

export default async function InviteRedirect({ url }: { url: string }) {
  redirect(url);
  return <></>;
}

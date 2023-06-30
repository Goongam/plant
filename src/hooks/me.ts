import { AuthOption } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default function useMe() {
  const { data, status, update } = useSession();
  const user = data?.user;

  return user;
}

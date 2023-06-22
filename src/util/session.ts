import { AuthOption } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/service/user";
import { getServerSession } from "next-auth";

export async function withSession(handler: (user: User) => void) {
  const session = await getServerSession(AuthOption);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return handler(user);
}

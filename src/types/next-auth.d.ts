import NextAuth from "next-auth";
import { User } from "@/service/user";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  //TODO: 타입 다른 곳에 정의 필요
  interface Session {
    user: User;
  }
}

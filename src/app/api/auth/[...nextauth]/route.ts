import user from "@/schema/user";
import { AddUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export const AuthOption: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user = {
        ...session.user,
        admin: session.user.email === "dlwjddn341@naver.com",
      };
      return session;
    },
    async signIn({ user: { id, name, email, image } }) {
      if (!email || !name) return false;

      AddUser({ email, name, image });
      return true;
    },
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };

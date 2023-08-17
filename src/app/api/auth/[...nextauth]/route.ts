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
    session({ session, token }) {
      session.user = {
        ...session.user,
        admin: session.user.email === "dlwjddn341@naver.com",
        id: token.id as string,
      };
      return session;
    },
    async signIn({ user: { id, name, email, image } }) {
      AddUser({ id, email, name, image });
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/loginError",
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };

import { connect } from "@/lib/mongoose";
import UserSchema from "@/schema/user";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  admin: boolean;
}

interface OauthUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

const ADMIN_EMAIL = "dlwjddn341@naver.com";
export async function AddUser({ id, name = "", email = "", image }: OauthUser) {
  connect();
  const findUser = await UserSchema.exists({ email });
  if (!findUser) {
    const newUser = new UserSchema({
      id,
      admin: email === ADMIN_EMAIL,
      email,
      image,
      name,
    });

    return newUser.save();
  }
}

export async function getUserIdbyEmail(email: string) {
  connect();
  const userId = await UserSchema.findOne({ email }, "_id");
  return userId;
}

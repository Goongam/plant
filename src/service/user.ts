import { connect } from "@/lib/mongoose";
import UserSchema from "@/schema/user";

export interface User {
  name: string;
  email: string;
  image: string;
  admin: boolean;
}

interface OauthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

const ADMIN_EMAIL = "dlwjddn341@naver.com";
export async function AddUser({ id, name, email, image }: OauthUser) {
  connect();
  const findUser = await UserSchema.exists({ email });
  if (!findUser) {
    const newUser = new UserSchema({
      admin: email === ADMIN_EMAIL,
      email,
      image,
      name,
    });

    return newUser
      .save()
      .then((docs: any) => docs)
      .catch((err: Error) => {
        console.error(err);
        return err;
      });
  }
}

export async function getUserIdbyEmail(email: string) {
  const userId = await UserSchema.findOne({ email }, "_id");
  return userId;
}

import { User } from "@/service/user";
import mongoose, { Model } from "mongoose";
import { SchemaDefinitionProperty } from "mongoose";
import PostSchema from "./post";

interface UserModel extends Model<User> {}

const UserSchema = new mongoose.Schema<User, UserModel>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  image: { type: String, required: false },
  admin: { type: Boolean, default: false },
});

// CategorySchema.set("toObject", {
//   versionKey: false,
//   transform: (doc, ret) => {
//     delete ret._id;
//     return ret;
//   },
// });

UserSchema.pre("deleteOne", function (next) {
  const userId = this.getQuery()["_id"];
  //TODO: 코멘트도 자동삭제 되도록
  //TODO: 회원탈퇴 기능 만들어서 작동 테스트 하기: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
  try {
    PostSchema.deleteMany({ author: userId }, next);
  } catch (err) {
    next();
  }
});

export default (mongoose.models.User as UserModel) ||
  mongoose.model<User, UserModel>("User", UserSchema);

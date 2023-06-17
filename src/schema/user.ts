import { User } from "@/service/user";
import mongoose, { Model } from "mongoose";
import { SchemaDefinitionProperty } from "mongoose";
interface UserModel extends Model<User> {}

const UserSchema = new mongoose.Schema<User, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

// CategorySchema.set("toObject", {
//   versionKey: false,
//   transform: (doc, ret) => {
//     delete ret._id;
//     return ret;
//   },
// });

export default (mongoose.models.User as UserModel) ||
  mongoose.model<User, UserModel>("User", UserSchema);

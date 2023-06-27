import { User } from "@/service/user";
import mongoose, { Model } from "mongoose";
import { SchemaDefinitionProperty } from "mongoose";
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

export default (mongoose.models.User as UserModel) ||
  mongoose.model<User, UserModel>("User", UserSchema);

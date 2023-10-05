import { Schema, model, connect } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  role: string;
  token: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  token: {
    type: String,
  },
});

const User = model<IUser>("User", userSchema);
export default User;

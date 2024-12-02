import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { randomUUID } from "crypto";

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const SALT_WORK_FACTOR = 7;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);

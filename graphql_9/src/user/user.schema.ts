import * as mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import * as crypto from "node:crypto";

@Schema()
@ObjectType()
export class User {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Prop({ required: true, unique: true }) //<- Mongoose
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmToken: string;

  @Prop({ required: true, default: false })
  active: boolean;

  comparePassword: (candidatePassword: string) => boolean;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });


UserSchema.pre("save", async function(next: mongoose.CallbackWithoutResultAndOptionalError) {
  const user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hashSync(user.password, salt);
  user.password = crypto.createHmac("sha256", user.password).digest("hex");

  return next();
});


UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  const user = this as UserDocument;

  //return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  return crypto.createHmac("sha256", candidatePassword).digest("hex") === user.password;
};


//////////////////////////////////////////////////////

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class ConfirmUserInput {
  @Field()
  email: string;

  @Field()
  confirmToken: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
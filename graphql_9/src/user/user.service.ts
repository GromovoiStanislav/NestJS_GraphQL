import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfirmUserInput, CreateUserInput, LoginInput, User, UserDocument } from "./user.schema";
import { nanoid } from "nanoid/async";
import Ctx from "../types/context.type";
import { signJwt } from "../utils/jwt.utils";
import { omit } from "lodash";
import { CookieOptions } from "express";
import {  Response } from 'express';


const cookieOptions: CookieOptions = {
  domain: "localhost",
  secure: false,
  sameSite: "strict",
  httpOnly: true,
  path: "/"
};

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }


  async createUser(input: CreateUserInput) {
    const confirmToken = await nanoid(32);
    return this.userModel.create({ ...input, confirmToken });
  }


  async confirmUser({ email, confirmToken }: ConfirmUserInput) {
    const user = await this.userModel.findOne({ email });

    if (!user || confirmToken !== user.confirmToken) {
      throw new Error("Email or confirm token are incorrect");
    }

    user.active = true;
    await user.save();
    return user;
  }


  async login({ email, password }: LoginInput, context: Ctx) {
    // Find our user
    const user = await this.userModel
      .findOne({ email })
      .select("-__v -confirmToken");

    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }

    if (!user.active) {
      throw new Error("Please confirm your email address");
    }

    const jwt = signJwt(omit(user.toJSON(), ["password", "active"]));

    // Set the JWT in a cookie
    context.res.cookie("token", jwt, cookieOptions);

    // return the user
    return user;
  }

  async logout(res: Response) {
    res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    //res.clearCookie('token')
    //return null;
  }


}

import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { LoginUserRequest } from "../model/auth-model";
import {
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class AuthService {
  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "username or password is wrong!");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "username or password is wrong!");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
        where: {
            username: user.username
        },
        data: {
            token: null
        }
    })

    return toUserResponse(result)
  }
}

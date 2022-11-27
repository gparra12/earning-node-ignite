import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "1179725705de16266506b3e203bffa21"
    ) as IPayload;

    const usersRepository = new UserRepository();
    const user = usersRepository.findById(userId);

    if(!user) {
        throw new AppError("User does not exists!", 401)
    }

    request.user = {
      id: userId
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}

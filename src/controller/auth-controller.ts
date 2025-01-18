import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth-service";
import { LoginUserRequest } from "../model/auth-model";
import { UserRequest } from "../type/user-request";

export class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await AuthService.login(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
            try {
                const response = await AuthService.logout(req.user!)
                res.status(200).json({
                    data: "OK"
                })
            } catch (error) {
                next(error)
            }
        }

}
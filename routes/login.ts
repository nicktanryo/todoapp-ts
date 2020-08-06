import { Router } from "express"
import bcrypt from "bcrypt"
import passport from "passport"

import { userNotAuthenticated } from "../authentication/authentication"

import User from "../models/User"
import { IUserSchema } from "../interfaces/interfaces"

const router = Router()

router.route("/")
    .get((req: Express.Request, res: Express.Response) => {
        (res as any).status(200).send({
            isAuthenticated: req.isAuthenticated(),
            data: {
                username: req.isAuthenticated() ? (req as any).user.username : null
            },
            error: null
        })
    })
    .post(userNotAuthenticated, passport.authenticate("local", {}), async (req: Express.Request, res: Express.Response) => {
        try {
            let userFound: IUserSchema | null = await User.findOne({ username: (req as any).body.username })

            if (!userFound) {
                (res as any).status(404).send({
                    isAuthenticated: req.isAuthenticated(),
                    data: null,
                    error: "USER NOT FOUND"
                })
            } else {
                if (await bcrypt.compare((req as any).body.password, userFound.password as string)) {
                    (res as any).status(200).send({
                        isAuthenticated: req.isAuthenticated(),
                        data: {
                            username: userFound.username
                        },
                        error: null
                    })
                }
            }
        } catch (err) {
            console.log(err);
            (res as any).status(500).send({
                isAuthenticated: false,
                data: null,
                error: `SERVER ERROR\n${err}`
            })
        }
    })

export default router
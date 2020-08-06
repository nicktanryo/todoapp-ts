import dotenv from "dotenv"
dotenv.config()

import { Router } from "express"
import bcrypt from "bcrypt"
import passport from "passport"

import User from "../models/User"
import { IUserSchema } from "../interfaces/interfaces"
import { userNotAuthenticated } from "../authentication/authentication"

const router = Router()

router.route("/")
    .post(userNotAuthenticated, async (req: Express.Request, res: Express.Response) => {
        const { username, password, fName, lName, email } = (req as any).body

        try {
            let userFound: IUserSchema | null = await User.findOne({ username })
            if (userFound) {
                console.log(`User with username "${username}" exists`);
                (res as any).status(401).send({
                    isAuthenticated: req.isAuthenticated(),
                    data: null,
                    error: "USER WITH SAME USERNAME EXISTS"
                })
            } else {
                let hashedPassword: string = await bcrypt.hash(password as string, Number(process.env.BCRYPT_SALT as string))
                let newUser = new User({
                    username,
                    password: hashedPassword,
                    fName,
                    lName,
                    email,
                    todolist: []
                })

                let saveUser = await newUser.save()

                passport.authenticate('local', {})(req, res, () => {
                    (res as any).status(200).send({
                        isAuthenticated: true,
                        data: saveUser,
                        error: null
                    })
                })
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
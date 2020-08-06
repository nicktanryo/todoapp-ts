import { PassportStatic } from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcrypt"
import User from "../models/User"
import { IUserSchema } from "../interfaces/interfaces"

type authCallback = (err: string | null, user?: {}) => any
export interface user extends IUserSchema {
    id: String
}

function initialize(passport: PassportStatic) {
    async function authenticateUser(username: String, password: String, done: authCallback) {
        let userFound: IUserSchema | null = await User.findOne({ username: username })

        if (!userFound) {
            console.log(`User with username "${username}" is not found`)
            return done(null, false)
        }

        try {
            if (await bcrypt.compare(password, userFound.password as string)) {
                return done(null, userFound)
            } else {
                console.log("Incorrect password")
                return done(null, false)
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user: user, done: authCallback) => done(null, user.id))
    passport.deserializeUser(async (id: String | string, done: authCallback) => {
        let userFound: IUserSchema | null = await User.findById(id)
        return done(null, userFound as IUserSchema)
    })
}

export default initialize;
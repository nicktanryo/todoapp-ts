import { Router } from "express"
import { userAuthenticated } from "../authentication/authentication"

const router = Router()

router.route("/")
    .post(userAuthenticated, (req: Express.Request, res: Express.Response) => {
        req.logout();
        (res as any).status(200).send({
            isAuthenticated: true,
            data: null,
            error: null
        })
    })

export default router
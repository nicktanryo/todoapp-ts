function userAuthenticated(req: Express.Request, res: Express.Response, next: any) {
    if (!req.isAuthenticated()) {
        (res as any).status(401).send({
            isAuthenticated: req.isAuthenticated(),
            data: null,
            error: "UNAUTHORIZED"
        })
    } else {
        next()
    }
}

function userNotAuthenticated(req: Express.Request, res: Express.Response, next: any) {
    if (req.isAuthenticated()) {
        (res as any).status(401).send({
            isAuthenticated: !req.isAuthenticated(),
            data: null,
            error: "UNAUTHORIZED"
        })
    } else {
        next()
    }
}

export { userAuthenticated, userNotAuthenticated }
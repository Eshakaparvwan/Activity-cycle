import { NextFunction, Router, Response, Request } from "express";
import { ROLES } from "../../utility/DB_constants";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response";
import statusServices from "./status.services";


const router = Router();

router.post("/create",
    // permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await statusServices.createStatus(req.body);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/display",
    // permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await statusServices.getStatus();
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e)
        }
    });

router.put("/update",
    // permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await statusServices.updateStatus(req.body);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e)
        }
    });

export default router;
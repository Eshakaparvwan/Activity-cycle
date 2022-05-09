import { NextFunction, Router, Response, Request } from "express";
// import { ROLES } from "../../utility/DB_constants";
// import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response";
import taskService from "./task.service";


const router = Router();

router.post("/create",
    // permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await taskService.createTask(req.body);
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
            const result = await taskService.getTask();
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
            const result = await taskService.updateTask(req.body);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e)
        }
    });

export default router;
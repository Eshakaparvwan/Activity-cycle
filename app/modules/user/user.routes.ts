import { NextFunction, Router, Request, Response } from "express";
import { ROLES } from "../../utility/DB_constants";
// import { multerMiddlerWare } from "../../../utility/fileStorageEngine";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response";
import userServices from "./user.services";
import { CreateUserValidator, LoginUserValidator, ResetPasswordValidator } from "./user.validation";
import { multerMiddlerWare } from "../../utility/fileStorageEngine";
import { Result } from "express-validator";

const router = Router();

// register user
router.post("/register",
    CreateUserValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.createUser(req.body);
            //send id
            const { id } = result;
            const cycle = await userServices.createCycle(id)
            res.send(new ResponseHandler(cycle));
        }
        catch (e) {
            next(e);
        }
    });

// login user
router.post("/login",
    LoginUserValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.login(req.body);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    });

router.post("/forgot-password",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            const result = await userServices.forgotPassword(email);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.post("/reset-password",
    ResetPasswordValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.resetPassword(req.body);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/userData",
    permit([ROLES.USER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.user;
            console.log(id);
            const result = await userServices.getOne(id);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });
router.post("/file-upload",
    permit([ROLES.USER]),
    multerMiddlerWare,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.file)
            const { taskId } = req.body
            if (!req.file) throw { message: "file not found " }
            await userServices.addFile(req.file as Express.Multer.File, taskId, res.locals.user._id, req.body.folderId);
            res.send(new ResponseHandler("File Uploaded"));
        }
        catch (e) {
            next(e);
        }
    });

router.put('/lock',
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            const result=await userServices.lockuser(id);
            res.send(new ResponseHandler("user locked"));
        }
        catch (e) {
            next(e);
        }
    });

    router.put('/unlock',
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            const result=await userServices.unlockuser(id);
            res.send(new ResponseHandler("user unlocked"));
        }
        catch (e) {
            next(e);
        }
    });

router.get('/filter/:year',
permit([ROLES.ADMIN]),
async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { year }= req.params;
        console.log(year)
        const result=await userServices.filterData(+year)
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});


export default router;

import { body } from "express-validator";
import  validate  from "../../utility/validate";

// _id?: string,
// name: string,
// email: string,
// password: string,
// roleId: string,
// resetToken?: string | null,
// resetTokenExpiry?: number | null,
// userStatus: string,
// cycleFrom: Date,
// cycleTo: Date,
// cycle: [Object]

export const CreateUserValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).withMessage("name is required / must be alphabetic"),
    body('email').isEmail().withMessage("Email is Required"),
    body('password').isString().withMessage("Password is required"),
    // body('roleId').isString().withMessage("roleId is Required"),
    validate
]

export const LoginUserValidator = [
    body('email').isEmail().withMessage("Email is Required"),
    body('password').isString().withMessage("Password is required"),
    validate
]

export const ResetPasswordValidator = [
    body('resetToken').notEmpty().isString().withMessage("Reset Token is Required"),
    body('password').notEmpty().isString().isLength({ min: 1 }).trim().withMessage("password is required"),
    body('confirmPassword').notEmpty().isString().isLength({ min: 1 }).trim().withMessage("password is required"),
    validate
]
// export const createFileValidator = [
//     body('file').isString().isLength({ min: 1 }).trim().withMessage("file name is required").
//         custom(async value => {
//             const result = await UserDB.findOne({ 'folders.files.filename': value });
//             if (result?._id) return Promise.reject('file already exists');
//             return true;
//         }),
//     validate
// ]

// export const createFolderValidator = [
//     body('name').isString().isLength({ min: 1 }).trim().withMessage("Folder name is required").
//         custom(async value => {
//             const result = await UserDB.findOne({ 'folders.name': value });
//             if (result?._id) return Promise.reject('Folder already exists');
//             return true;
//         }),
//     validate
// ]
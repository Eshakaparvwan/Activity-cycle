import { ICredentials } from "../../utility/credentials";
import userRepo from "./user.repo";
import { IFile, IUser } from "./user.types";
import { sign } from "jsonwebtoken";
import { randomBytes } from "crypto";
import { sendMail } from "../../utility/sendmail";
import { IPass } from "./user.types";
import path from "path";
import fs from "fs-extra";
import { Status } from "../../utility/DB_constants";
const createUser = async (user: IUser) => {
    const userData = await userRepo.createUser(user);
    //    console.log(userData)
    if (userData) {

        const _id = userData._id.toString();
        let uploadFolder = path.join("storage", _id);
        //    console.log(uploadFolder)

        try {
            const f = await fs.ensureDir(uploadFolder)
        }
        catch (e) {
            throw e;
        }
    }
    return userData;

}
const findOne = (credentials: ICredentials) => userRepo.findOne(credentials);
const getAll = () => userRepo.getAll();
const getOne = (id: string) => userRepo.getOne(id);
const deleteUser = (id: string) => userRepo.deleteUser(id);

const login = async (credentials: ICredentials) => {
    const userRecord = await userRepo.findOne(credentials);
    if (!userRecord) {
        throw { statusCode: 404, message: "INVALID CREDENTIALS" }
    }
    const { SECRET_KEY } = process.env;
    const token = sign(JSON.parse(JSON.stringify(userRecord)), SECRET_KEY || '');
    const { roleId } = userRecord
    const { _id } = userRecord
    return { token, roleId, _id };
}

const resetPassword = async (passwords: IPass) => {
    if (passwords.confirmPassword === passwords.password) {
        const user = await userRepo.findByToken(passwords.resetToken);
        if (!user || user.resetToken && (passwords.resetToken !== user.resetToken) || user.resetTokenExpiry && (Date.now() >= user.resetTokenExpiry)) {
            throw { statusCode: 400, message: 'Token invalid for resetting your password' }
        }
        user.password = passwords.confirmPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
    } else {
        throw { message: "password not Matched" };
    }
    return "password successfully changed";
};

const forgotPassword = async (email: string) => {
    try {
        const data = await userRepo.forgotPassword(email);
        if (!data) throw { statusCode: 400, message: "user not found" };
        if (
            data.resetToken &&
            data.resetTokenExpiry &&
            Date.now() <= data.resetTokenExpiry
        ) throw { statusCode: 400, message: "Email for reset password already been sent" }
        data.resetToken = randomBytes(6).toString('hex');
        data.resetTokenExpiry = Date.now() + (1000 * 60 * 60);
        const result = await data.save();
        if (result._id && result.resetToken) {
            await sendMail(email, result.resetToken);
            return "Email send";
        }
    }
    catch (e) {
        throw e;
    }
};

const createCycle = async (id: string) => {
    try {
        const data = await userRepo.getDate(id);

        const firstCycle = {
            from: new Date().getFullYear(),
            to: new Date().getFullYear() + 2,
            activity: [
                {
                    task: "62667505fd776965fb156417",
                    optional: true
                },
                {
                    task: "6266750bfd776965fb156419"
                },
                {
                    task: "6266750ffd776965fb15641b"
                },
                {
                    task: "6266752dfd776965fb15641d"
                },
                {
                    task: "6266753afd776965fb15641f"
                },
                {
                    task: "62667543fd776965fb156421"
                },
                {
                    task: "6266755dfd776965fb156423"
                },
                {
                    task: "62667568fd776965fb156425"
                },
                {
                    task: "62667582fd776965fb156427"
                }


            ]
        };
        const SecondCycle = {
            from: new Date().getFullYear() + 2,
            to: new Date().getFullYear() + 4,
            activity: [
                {
                    task: "62667596fd776965fb156429"
                },
                {
                    task: "6266759efd776965fb15642b"
                },
                {
                    task: "626675a5fd776965fb15642d"
                },
                {
                    task: "626675b4fd776965fb15642f"
                },
                {
                    task: "626675b8fd776965fb156431"
                },
                {
                    task: "626675bcfd776965fb156433"
                },
                {
                    task: "62667610fd776965fb156435"
                },
                {
                    task: "62667614fd776965fb156437"
                },
                {
                    task: "62667618fd776965fb156439"
                }


            ]
        };
        // console.log(SecondCycle)
        const thirdCycle = {
            from: new Date().getFullYear() + 4,
            to: new Date().getFullYear() + 6,
            activity: [
                {
                    task: "6266762bfd776965fb15643b"
                },
                {
                    task: "62667631fd776965fb15643d"
                },
                {
                    task: "62667634fd776965fb15643f"
                },
                {
                    task: "62667643fd776965fb156441"
                },
                {
                    task: "62667647fd776965fb156443"
                },
                {
                    task: "6266764bfd776965fb156445"
                },
                {
                    task: "6266765afd776965fb156447"
                },
                {
                    task: "6266765efd776965fb156449"
                },
                {
                    task: "62667663fd776965fb15644b",
                    optional: true
                },


            ]
        };
        // const subcycle = ;
        const cycles = [
            {
                cycleFrom: new Date().getFullYear(),
                cycleTo: new Date().getFullYear() + 9,
                subcycle: [firstCycle, SecondCycle, thirdCycle]
            }

        ]

        const userData = await userRepo.updateCycle(id, cycles);
        return userData;

    }
    catch (e) {
        throw e;
    }
}

const addFile = async (fileData: Express.Multer.File, taskId: string, userId: string, folderId: string) => {
    try {
        const file: IFile = {
            filename: fileData.filename || '',
            path: fileData.path.split('\\').join('/') || '',
            taskId: taskId
        }

        const result = await userRepo.uploadFile(file, userId, folderId);
        console.log(result)
    }

    catch (e) {
        throw (e);
    }
}

const filterData = async (year: number) => {
    const result = await userRepo.userStatus(year);
    const filteredUser: any[] = [];
    result.forEach(user => {
        const cycles = user.cycles.filter((cycle: any) => cycle.cycleFrom <= year && cycle.cycleTo >= year || cycle.cycleTo <= year)
        const cycle = cycles[cycles.length - 1];
        let count = 0;
        cycle.subcycle.forEach((sub: any) => {
            sub.activity.forEach((task: any) => {
                if (task.taskStatus == Status.COMPLETED && !task.optional && task.uploadedYear===year) {
                    count++;
                }
            })
        })
        let userStatus = 'PENDING'
        if (count >= 25) {
            userStatus = 'COMPLETED'
        }
        filteredUser.push({ "_id": user._id, name: user.name, "status": userStatus })
    });
    return filteredUser;
}

const lockuser = (id: string) => userRepo.lockuser(id);
const unlockuser = (id: string) => userRepo.unlockuser(id);
export default {
    createUser,
    findOne,
    getAll,
    getOne,
    login,
    deleteUser,
    resetPassword,
    forgotPassword,
    createCycle,
    addFile,
    filterData,
    lockuser,
    unlockuser
};
import mongoose from "mongoose";
import { ICredentials } from "../../utility/credentials";
import UserModel from "./user.schema";
import { IActivity, ICycle, IFile, IUser } from "./user.types"
import { Types } from "mongoose"
import { IPass } from "./user.types";

const createUser = (user: IUser) => UserModel.create(user);
const findOne = (credentials: ICredentials) => UserModel.findOne(credentials);
const getAll = () => UserModel.find().populate("cycles.subcycle.activity.task")
  .populate("cycles.subcycle.activity.task.category");
const getOne = (id: string) => UserModel.findById(id).populate("cycles.subcycle.activity.task");
const deleteUser = (id: string) => UserModel.deleteOne({ _id: id });
//password realted operations

const findByToken = (resetToken: string) => UserModel.findOne({ resetToken: resetToken });
const resetPassword = (passwords: IPass) => UserModel.updateOne({ _id: passwords._id }, { $set: { password: passwords.confirmPassword } });
const forgotPassword = (email: string) => UserModel.findOne({ email: email });


// date related operations
const getDate = (_id: string) => UserModel.aggregate([
  {
    $match: { _id: new mongoose.Types.ObjectId(_id) }
  },
  {
    $project: {
      _id: 0,
      dateParts: { $dateToParts: { date: "$cycleFrom" } }
    }
  }
]);




const updateCycle = (id: string, cycle: any) => UserModel.updateOne({ _id: id }, { $set: { cycles: cycle } });

const uploadFile = (fileData: IFile, userId: string, folderId: string) => {
  return UserModel.updateOne(
    {
      _id: new Types.ObjectId(userId),
      'folders._id': folderId
    },
    {
      $set: {
        "cycles.$[].subcycle.$[].activity.$[activityElement].taskStatus": "6260f2783575b850d64128eb",
        "cycles.$[].subcycle.$[].activity.$[activityElement].path":
          fileData.path,
        "cycles.$[].subcycle.$[].activity.$[activityElement].filename":
          fileData.filename,
        "cycles.$[].subcycle.$[].activity.$[activityElement].uploadedYear":
          new Date().getFullYear(),
      },
    },
    {
      arrayFilters: [
        {
          "activityElement._id": new Types.ObjectId(fileData.taskId),
        },
      ],
    }
  );

}
const userStatus = (year: number) => UserModel.aggregate([
  {
    $match: {
      $or: [
        {
          $and: [
            { "cycles.cycleFrom": { $lte: year } },
            { "cycles.cycleTo": { $gte: year } }
          ]
        },
        { "cycles.cycleTo": { $lte: year } }
      ]
    }
  }
]);



const lockuser = (id: string) => UserModel.updateOne({ _id: id }, { $set: { isLocked: true } });
const unlockuser = (id: string) => UserModel.updateOne({ _id: id }, { $set: { isLocked: false } });


export default {
  createUser,
  findOne,
  getAll,
  getOne,
  deleteUser,
  findByToken,
  resetPassword,
  forgotPassword,
  getDate,
  updateCycle,
  uploadFile,
  userStatus,
  lockuser,
  unlockuser,

};
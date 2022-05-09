import UserStatusModel from "./status.schema";
import { IStatus } from "./status.types";
const createStatus = (status: IStatus) => UserStatusModel.create(status);

const getStatus = () => UserStatusModel.find();

const updateStatus = (status: IStatus) => UserStatusModel.updateOne({ _id: status._id });

export default {
    createStatus,
    getStatus,
    updateStatus
}

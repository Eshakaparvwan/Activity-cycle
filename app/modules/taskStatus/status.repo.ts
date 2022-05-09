import TaskStatusModel from './status.schema'
import { IStatus } from "./status.types";
const createStatus = (status: IStatus) => TaskStatusModel.create(status);

const getStatus = () => TaskStatusModel.find();

const updateStatus = (status: IStatus) => TaskStatusModel.updateOne({ _id: status._id });

export default {
    createStatus,
    getStatus,
    updateStatus
}

import TaskModel from "./task.schema";
import { ITask } from "./task.types";
const createTask = (task: ITask) => TaskModel.create(task);

const getTask = () => TaskModel.find();

const updateTask = (task: ITask) => TaskModel.updateOne({ _id: task._id });

export default {
    createTask,
    getTask,
    updateTask
}

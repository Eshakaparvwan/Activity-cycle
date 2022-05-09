import taskRepo from "./task.repo";
import { ITask } from "./task.types";
const createTask = (task: ITask) => taskRepo.createTask(task);

const getTask = () => taskRepo.getTask();

const updateTask = (task: ITask) => taskRepo.updateTask(task);

export default {
    createTask,
    getTask,
    updateTask
}

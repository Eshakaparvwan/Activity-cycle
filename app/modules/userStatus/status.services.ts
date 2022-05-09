import statusRepo from "./status.repo";
import { IStatus } from "./status.types";
const createStatus = (status: IStatus) => statusRepo.createStatus(status);

const getStatus = () => statusRepo.getStatus();

const updateStatus = (status: IStatus) => statusRepo.updateStatus(status);

export default {
    createStatus,
    getStatus,
    updateStatus
}

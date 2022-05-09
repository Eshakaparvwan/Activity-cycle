import { Schema, model, Document } from "mongoose";
import { IStatus } from "./status.types";

class StatusSchema extends Schema {
    constructor() {
        super({
            status: {
                type: String,
                enum: ['PENDING', 'COMPLETED'],
                required: true
            }
        })
    }
}

type StatusDocument = Document & IStatus;
const TaskStatusModel = model<StatusDocument>('Taskstatus', new StatusSchema());
export default TaskStatusModel;
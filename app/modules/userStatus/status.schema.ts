import { Schema, model, Document } from "mongoose";
import { IStatus } from "./status.types";

class StatusSchema extends Schema {
    constructor() {
        super({
            status: {
                type: String,
                enum: ['PENDING', 'COMPLETED', 'LOCKED'],
                required: true
            }
        })
    }
}

type StatusDocument = Document & IStatus;
const UserStatusModel = model<StatusDocument>('Status', new StatusSchema());
export default UserStatusModel;
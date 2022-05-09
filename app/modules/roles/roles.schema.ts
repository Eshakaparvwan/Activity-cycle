import { Schema, model, Document } from "mongoose";
import { IRole } from "./roles.types";

class RoleSchema extends Schema {
    constructor() {
        super({
            role: {
                type: String,
                required: true
            }
        })
    }
}

type RoleDocument = Document & IRole;
const RoleModel = model<RoleDocument>('Role', new RoleSchema());
export default RoleModel;
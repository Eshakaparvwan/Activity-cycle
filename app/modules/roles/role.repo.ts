import RoleModel from "./roles.schema";
import { IRole } from "./roles.types";

const createRole = (role: IRole) => RoleModel.create(role);

const getRole = () => RoleModel.find();

const updateRole = (role: IRole) => RoleModel.updateOne({ _id: role._id });

export default {
    createRole,
    getRole,
    updateRole
}

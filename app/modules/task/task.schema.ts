import { Schema, model, Document, Types } from "mongoose";
import { ITask } from "./task.types";


// _id?: string,
// filename: string,
// path:string,
// taskStatus:string,
// optional:Boolean
class TaskSchema extends Schema {
    constructor() {
        super({
            name:{
                type:String,
                required:true
            },
            category:{
                type: Types.ObjectId,
                ref:"Category",
                required:true
            }
        })
    }
}

type TaskDocument = Document & ITask;
const TaskModel = model<TaskDocument>('task', new TaskSchema());
export default TaskModel;
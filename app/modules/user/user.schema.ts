import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user.types";

class UserSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            roleId: {
                type: Types.ObjectId,
                required: true,
                default: "625fd069369e6206a7acc7d6"
            },
            resetToken: {
                type: String,
                required: false
            },
            resetTokenExpiry: {
                type: Number,
                required: false
            },
            userStatus: {
                type: Types.ObjectId,
                required: true,
                default: "625fd3a621cb62430aa3454f"
            },
            cycles: [
                {
                    cycleFrom: {
                        type: Number,
                        // default: Date.now,
                        required: true

                    },
                    cycleTo: {
                        type: Number,
                        // default: new Date(+new Date() + 3285 * 24 * 60 * 60 * 1000),
                        required: true


                    },
                    subcycle: [
                        {
                            from: { type: Number, required: false },
                            to: { type: Number, required: false },

                            activity: [
                                {
                                    task: { type: Types.ObjectId,ref:"task" },
                                    filename: { type: String, required: false, default: null },
                                    path: { type: String, required: false, default: null },
                                    uploadedYear:{ type:Number , required:false},
                                    taskStatus: {
                                        type: Types.ObjectId,
                                        required: false,
                                        default: "6260f26c3575b850d64128e9"

                                    },
                                    optional: {
                                        type: Boolean,
                                        default: false
                                    }
                                }

                            ]

                        }



                    ]




                }
            ],

            joiningDate:{
                type:Date,
                default:Date.now()
            },
            isLocked:{
                type:Boolean,
                default:false
            }

        }, { timestamps: true})
    }
}

type UserDocument = Document & IUser;
const UserModel = model<UserDocument>('User', new UserSchema());
export default UserModel;
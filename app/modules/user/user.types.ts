export interface IPass {
    _id?: string,
    resetToken: string,
    password: string,
    confirmPassword: string
}
export interface ITask{
    _id?: string,
    task: string,
    filename?:string,
    path?: string,
    taskStatus?:string,
    optional?:Boolean

}

export interface IActivity{
    from :number,
    to:number,
    activity:[ITask]
}
export interface ICycle{
    _id?:string,
    cycleFrom: number,
    cycleTo: number,
    subcycle: [IActivity]

}

export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password: string,
    roleId: string,
    resetToken?: string | null,
    resetTokenExpiry?: number | null,
    userStatus: string,
    cycles:[ICycle],
    joiningDate?:Date,
    isLocked?:boolean
}
export interface IFile {
    _id?:string,
    filename: string,
    path: string,
    taskId:string
}
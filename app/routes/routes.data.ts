import { IExclude, Route } from "./routes.types";
import userRouter from "../modules/user/user.routes"
import roleRouter from "../modules/roles/roles.routes"
import userStatusRouter from "../modules/userStatus/status.routes"
import taskStatusRouter from "../modules/taskStatus/status.routes"
import taskRouter from "../modules/task/task.routes"
export const routes: Route[] = [
    new Route('/user',userRouter),
    new Route('/role', roleRouter),
    new Route('/userStatus',userStatusRouter),
    new Route('/taskStatus',taskStatusRouter),
    new Route('/task',taskRouter)

];

export const excludedPaths: IExclude[] = [
    { method: 'POST', path: '/user/login' },
    { method:'POST' ,path:'/user/register'},
    { method:'POST' ,path:'/user/forgot-password'},
    { method:'POST' ,path:'/user/reset-password'},
    { method:'POST' ,path:'/role/create'},
    { method:'POST' ,path:'/userStatus/create'},

]
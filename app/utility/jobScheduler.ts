import schedule from "node-schedule";
import { Status , userStatus } from "./DB_constants";
import userRepo from "../modules/user/user.repo";
const rule = new schedule.RecurrenceRule();
rule.year = 1;


export const jobScheduler= async()=>{
    try{

        const users=await userRepo.getAll();
        const testdate = 2032;
        if(users){
            const job=schedule.scheduleJob(rule,async ()=>{

                for(let u of users){
                    const startDate=u.cycles[0].cycleFrom;
                    const endDate=u.cycles[0].cycleTo;
                    const currentdate=new Date().getFullYear()
                    if(currentdate>=endDate){
                        u.cycles.forEach((cycle)=>{
                            cycle.subcycle.forEach((activity)=>{
                                activity.activity.forEach((task)=>{
                                    if(task.taskStatus== Status.PENDING && task.optional==false)
                                    {
                                        // console.log(task)
                                        u.isLocked=true;
                                    }

                                })
                                   
                            })
                        })
                        await u.save();
                        
                        
                        
                        
                    }
                }
            })
        }
    }catch(e){
        throw e;
    }
}

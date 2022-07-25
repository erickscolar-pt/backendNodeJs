import prismaClient from "../../prisma";

interface TaskRequest{
    task: string;
    user_id: string
}

class CreateTaskService{
    async execute({ task, user_id }: TaskRequest){
        

        if(task === ''){
            throw new Error('Task invalid')
        }

        const createtasks = await prismaClient.tasks.create({
            data:{
                task: task,
                user_id: user_id
            },
            select:{
                id: true,
                task: true,
                user_id: true
            }
        })

        return createtasks;

    }
}

export { CreateTaskService }
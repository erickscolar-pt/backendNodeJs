import prismaClient from "../../prisma";

class ListTaskService{
    async execute(user_id: string){


        const listtask = await prismaClient.tasks.findMany({
            where:{
                user_id: user_id
            },
            select:{
                id: true,
                task: true
            }
        })

        return listtask;

    }
}

export { ListTaskService }
import prismaClient from "../../prisma";

interface DelTaskRequest{
    id: string;
}
class DeleteTaskService{
    async execute({ id }: DelTaskRequest){

        const deltask = await prismaClient.tasks.delete({
            where:{
                id: id
            }
        })

        return deltask

    }
}

export { DeleteTaskService }
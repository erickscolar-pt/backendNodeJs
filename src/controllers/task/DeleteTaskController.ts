import { Request, Response } from 'express'
import { DeleteTaskService } from '../../services/task/DeleteTaskService'

class DeleteTaskController{
    async handle(req: Request, res: Response){
        
        const id = req.query.id as string;
        
        const deleteTaskService = new DeleteTaskService();
        
        const deltask = await deleteTaskService.execute({
            id
        });

        return res.json(deltask);
    }
}

export { DeleteTaskController }
import { Request, Response } from 'express'
import { ListTaskService } from '../../services/task/ListTaskService'

class ListTaskController{
    async handle(req: Request, res: Response){
        const listTaskService = new ListTaskService();

        const user_id = req.user_id;

        const listtask = await listTaskService.execute(user_id);

        return res.json(listtask);
    }
}

export { ListTaskController }
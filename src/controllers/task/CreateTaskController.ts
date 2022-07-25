import { Request, Response } from 'express'
import { CreateTaskService } from '../../services/task/CreateTaskService'

class CreateTaskController{
    async handle(req: Request, res: Response){

        const { task } = req.body;
        const user_id = req.user_id;

        const createTaskService = new CreateTaskService();

        const createtask = await createTaskService.execute({
            task, 
            user_id
        });

        return res.json(createtask);

    }
}

export { CreateTaskController }
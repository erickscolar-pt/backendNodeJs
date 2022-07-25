import { Request, response, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
    async handle(req: Request, res: Response){

        //console.log(req.body)

        const { username, password } = req.body; 

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            username,
            password
        });

        return res.json(user);
    }
}

export { CreateUserController }
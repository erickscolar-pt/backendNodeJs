import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateTaskController } from './controllers/task/CreateTaskController';
import { ListTaskController } from './controllers/task/ListTaskController';
import { DeleteTaskController } from './controllers/task/DeleteTaskController';

const router = Router();

// -- user para criar usuario --
router.post('/signup', new CreateUserController().handle)

// -- user para logar usuario --
router.post('/signin',  new AuthUserController().handle)

// rota de detalhes do usuario com isAuthenticated, que é rota privada, verificando token JWT 
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas staks
router.post('/task', isAuthenticated, new CreateTaskController().handle)
router.get('/task', isAuthenticated, new ListTaskController().handle)
router.delete('/task/delete', isAuthenticated, new DeleteTaskController().handle)

export { router }; 
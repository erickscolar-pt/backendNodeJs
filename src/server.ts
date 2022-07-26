import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes';

const PORT = process.env.PORT || 3333
const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    })
  }

  //Caso tiver erro retorna o erro
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

app.listen(PORT, () => console.log('*** Servidor online ***'))

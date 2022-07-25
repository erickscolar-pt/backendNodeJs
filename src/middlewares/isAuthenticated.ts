import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req:Request,
    res: Response,
    next: NextFunction
){
    // receber token
    const authToken = req.headers.authorization;

    if(!authToken){
        // barra e finaliza caso n tenha nenhum token
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try{
        //Validar esse token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
            ) as PayLoad;

            // Recuperar id do token e colocar dentro de uma variavel user_id
            req.user_id = sub;


            //console.log(sub)
            return next();

    }catch(err){
        return res.status(401).end();
    }

    // exemple token 
    /* 
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1OGI2NmRmLTIzZGMtNDExMi1iY2FhLTUwY2FjYWYzNjBlOCIsInVzZXJuYW1lIjoiZXJpY2subW9yZWlyYSIsImlhdCI6MTY1ODYzNDY5NSwiZXhwIjoxNjYxMjI2Njk1LCJzdWIiOiJkNThiNjZkZi0yM2RjLTQxMTItYmNhYS01MGNhY2FmMzYwZTgifQ.JWsPXo-omNPvWd5i_dLpU3EcQNszYfdHQKJ72Y7LQdI
    */
    //console.log('chamou mddwre => ' + token)
    //console.log('chamou mddwre')

    //return next();

}
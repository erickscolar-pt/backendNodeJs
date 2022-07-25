import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    username: string;
    password: string;
}

// Requisição para usuario logar
class AuthUserService{
    async execute({ username, password }:AuthRequest){
        //console.log('username => ' + username);

        //Verifica se usuario existe
        const user = await prismaClient.users.findFirst({
            where:{
                username: username
            }
        })

        if(!user){
            throw new Error("Username/password incorrect")
        }
        
        // verificar se a senha que mandou está correta
        // usando a função compare do bcryptjs
        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch){
            throw new Error("Username/password incorrect")
        }

        // caso ok ...
        // gerar um token JWT e devolver os dados do usuario como id, username ou outros dados que tiver
        const token = sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { // Token gerado dura 30 dias
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return { 
            id: user.id,
            username: user.username,
            token: token
         }
    }
}

export { AuthUserService };

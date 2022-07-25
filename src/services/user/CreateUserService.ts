import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest{
    username: string;
    password: string;
}

class CreateUserService{
    async execute({username, password}: UserRequest){

    //console.log('recebeu => ' + username + ' ' + password)

    // verifica se enviou o username
    if(!username){
        throw new Error("Username incorrect")
    }

    // verifica se o username existe
    const userAlreadyExists = await prismaClient.users.findFirst({
        where:{
            username: username
        }
    })

    if(userAlreadyExists){
        throw new Error("User already exists")
    }

    //const para cryptografar senha
    const passwordHash = await hash(password, 8)

    const user = await prismaClient.users.create({
        data:{
            username: username,
            password: passwordHash
        },
        select:{ // Especificando o que devolver
            id: true,
            username: true
        }
    })
    

        return user
    }
}

export { CreateUserService }
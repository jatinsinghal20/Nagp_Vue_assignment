import UserAuth from '@/Common/Models/UserAuth';
import User from '@/Common/Models/User';
import { post, get } from './api';
import UserResponse from '@/Common/Models/UserResponse';

export async function userLogin(user: UserAuth): Promise<User | undefined> {
    try {
        const response = await post("/users/login", { user });
        return (response.data as UserResponse).user
    }
    catch(err){
        throw err
    }
}

export async function userRegister(user: any): Promise<User | undefined> {
    try {
        const response = await post("/users", { user });
        return (response.data as UserResponse).user
    }
    catch(err){
        throw err;
        
    }
}

export async function getUser(): Promise<User | undefined> {
    try {
        const response = await get("/user")
        return (response.data as UserResponse).user
    }
    catch{
        console.log("failed");
    }
}
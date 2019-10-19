import axios from "axios";
import UserAuth from '@/Common/Models/UserAuth';
import User from '@/Common/Models/User';
import UserResponse from '@/Common/Models/UserResponse';

export const conduitAPI = axios.create({
    baseURL: "https://conduit.productionready.io/api"
})

export function setJWT(jwt: string) {
    conduitAPI.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export function clearJWT(jwt: string) {
    delete conduitAPI.defaults.headers.common["Authorization"];
}

export async function userLogin(user: UserAuth): Promise<User | undefined> {
    try {
        const response = await conduitAPI.post("/users/login", { user });
        return (response.data as UserResponse).user
    }
    catch{
        console.log("failed");
    }
}

export async function get(resource: string, slug = "") {
    return conduitAPI.get(`${resource}/${slug}`).catch(error => {
        throw new Error(` ${error}`);
    });
}

export async function query(resource: string, params : any) {
    return conduitAPI.get(`${resource}`, params).catch(error => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
}

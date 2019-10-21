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

export function clearJWT() {
    delete conduitAPI.defaults.headers.common["Authorization"];
}

export async function get(resource: string, slug = "") {
    return conduitAPI.get(`${resource}/${slug}`).catch(error => {
        throw new Error(` ${error}`);
    });
}

export async function query(resource: string, params : any) {
    return conduitAPI.get(`${resource}`, params).catch(error => {
        throw new Error(`${error}`);
      });
}

export async function post(resource: string, params : any) {
    return conduitAPI.post(`${resource}`, params).catch(err => {
        throw err.response.data;
      });
}

export async function put(resource: string, params : any) {
    return conduitAPI.put(`${resource}`, params).catch(error => {
        throw new Error(`${error}`);
      });
}


export async function deleteApi(resource: string) {
    return conduitAPI.delete(`${resource}`).catch(error => {
        throw new Error(` ${error}`);
      });
}
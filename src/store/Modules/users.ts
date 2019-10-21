import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import UserProfile from "@/Common/Models/UserProfile"
import User from "@/Common/Models/User"
import UserAuth from '@/Common/Models/UserAuth';
import { setJWT, clearJWT } from "@/Services/api";
import JwtService from '@/Services/jwt.service';
import { userLogin, getUser, userRegister } from '@/Services/users.service';

@Module({
    namespaced: true,
    name: "users",
    dynamic: true,
    store
})
class UsersModule extends VuexModule {
    user: User | null = null;
    profile: UserProfile | null = null;
    errors: any = null;

    get username() {
        return this.user ? this.user.username : null
    }

    get isLoggedIn() {
        return this.user ? true : false;
    }

    //authenticte user
    @Action
    async login(userRequest: UserAuth) {
        try {
            const user = await userLogin(userRequest);        
            if (user) {
                JwtService.saveToken(user.token);
                setJWT(user.token);
                this.context.commit("setUser", user);
            }
        } catch (err) {
            this.context.commit("setErrors", err.errors);
            throw err;
        }
    }


    //register new user
    @Action
    async register(userRequest: any) {
        try {
            const user = await userRegister(userRequest);
            if (user) {
                JwtService.saveToken(user.token);
                setJWT(user.token);
                this.context.commit("setUser", user);
            }
        } catch (err) {
            this.context.commit("setErrors", err.errors);
            throw err;
        }
    }

    @Mutation
    setUser(payload: User) {
        if (payload) {
            this.user = payload
        }
    }

    @Mutation
    setErrors(payload: any) {
        console.log(payload);
        if (payload) {
            this.errors = payload;
        }
    }

    @Mutation
    resetErrors() {
        this.errors = null;
    }

    //check whether user is loggedin or not and get user if token is present.
    @MutationAction({ mutate: ['user'] })
    async checkAuth() {
        let user = null;
        if (!this.isLoggedIn) {
            let token: string | null = JwtService.getToken();
            if (token) {
                setJWT(token);
                const response = await getUser();
                if (response) {
                    user = response;
                }
            }
        }
        else {
            user = this.user;
        }
        return { user }
    }

    //clear store data and destroy token
    @Mutation
    signout() {
        this.user = null;
        JwtService.destroyToken();
        clearJWT();
    }
}

export default getModule(UsersModule);
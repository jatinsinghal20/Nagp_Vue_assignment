import { VuexModule, Module, getModule, MutationAction, Mutation } from "vuex-module-decorators";
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

    get username() {
        return this.user ? this.user.username : null
    }

    get isLoggedIn() {
        return this.user ? true : false;
    }

    //authenticte user
    @MutationAction({ mutate: ['user'] })
    async login(userRequest: UserAuth) {
        const user = await userLogin(userRequest);
        if (user) {
            JwtService.saveToken(user.token);
            setJWT(user.token);
        }
        return { user }
    }

    //register new user
    @MutationAction({ mutate: ['user'] })
    async register(userRequest: any) {
        try {
            const user = await userRegister(userRequest);
            if (user) {
                JwtService.saveToken(user.token);
                setJWT(user.token);
            }
            return { user }
        } catch (err) {
            throw new Error(`${err}`);
        }
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
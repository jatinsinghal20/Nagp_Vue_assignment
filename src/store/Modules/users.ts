import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators";
import store from "@/store";
import Profile from "@/Common/Models/Profile"
import User from "@/Common/Models/User"
import UserAuth from '@/Common/Models/UserAuth';
import {userLogin} from "@/Services/api"

@Module({
    namespaced: true, 
    name: "users",
    dynamic : true,
    store
})
class UsersModule extends VuexModule{
    user : User | null = null;
    profile : Profile | null = null;

    get username (){
        return this.user ? this.user.username : null
    }

    @MutationAction({mutate: ['user']})
    async login(userRequest : UserAuth) {
        const user = await userLogin(userRequest);
        return { user }
    }
}

export default getModule(UsersModule);
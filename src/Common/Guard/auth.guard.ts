import UsersModule from "@/store/Modules/users"

export default class authGuard {
    static async authGuard (to: any, from: any, next : any)  {
        let entryUrl = null
        if (UsersModule.isLoggedIn) {
          if (entryUrl) {
            const url = entryUrl;
            entryUrl = null;
            return next(url); // goto stored url
          } else {
            return next(); // all is fine
          }
        }
      
        await UsersModule.checkAuth(); 
        // we use await as this async request has to finish 
        // before we can be sure
      
        if (UsersModule.isLoggedIn) {
          next();
        } else {
          entryUrl = to.path; // store entry url before redirect
          next('/login');
        }
      };
}


import { RouterContext } from "../deps.ts";
class AuthController{
    login(){

    }
    async register(ctx:RouterContext){
        const {name, email, password}=await ctx.request.body().value;
        ctx.response.body=name;
        console.log(name);
    }
}

const authController=new AuthController();
export default authController;
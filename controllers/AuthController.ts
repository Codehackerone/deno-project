import { RouterContext } from "../deps.ts";
import User from "../models/User.ts";
class AuthController{
    login(){

    }
    async register(ctx:RouterContext){
        const {name, email, password}=await ctx.request.body().value;
        const user=await User.findOne({email});
        if(user)
        {
            ctx.response.status=422;
            ctx.response.body={message:"Email is already used"};
            return;
        }
        
    }
}

const authController=new AuthController();
export default authController;
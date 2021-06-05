import { RouterContext,hashSync,compareSync } from "../deps.ts";
import User from "../models/User.ts";
class AuthController{
    login(){

    }
    async register(ctx:RouterContext){
        const {name, email, password}=await ctx.request.body().value;
        // let user=await User.findOne({email});
        // if(user)
        // {
        //     ctx.response.status=422;
        //     ctx.response.body={message:"Email is already used"};
        //     return;
        // }
        const hashedPassword=hashSync(password);
        let newuser=new User({name,email,password:hashedPassword});
        await newuser.save();
        ctx.response.status=201;
        ctx.response.body={
            id:newuser.id,
            name:newuser.name,
            email:newuser.email
        };
    }
}

const authController=new AuthController();
export default authController;
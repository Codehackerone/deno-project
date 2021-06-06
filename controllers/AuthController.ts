import { RouterContext,hashSync,compareSync,create,Header,Payload,config} from "../deps.ts";
import User from "../models/User.ts";

const header:Header={ 
    alg: "HS512",
    typ: "JWT" 
};

class AuthController{
    async login(ctx:RouterContext){
        const {email,password}=await ctx.request.body().value;
        let user=await User.findOne({email});
        if(!email || !password){
            ctx.response.status=422;
            ctx.response.body={message:"Please provide email and password"};
            return;
        }
        if(!user)
        {
            ctx.response.status=422;
            ctx.response.body={message:"User doenst Exist"};
            return;
        }
        if (!compareSync(password,user.password)){
            ctx.response.status=422;
            ctx.response.body={message:"Incorrect Email/Password"};
            return;
        }
        const payload:Payload={
            iss:user,
            exp:(new Date().getTime()+600000)
        };
        const jwt = await create(header,payload,config().JWT_SECRET);
        ctx.response.status=200;
        ctx.response.body={
            id:user._id,
            name:user.name,
            email:user.email,
            jwt,
        }
    }
    async register(ctx:RouterContext){
        const {name, email, password}=await ctx.request.body().value;
        let user=await User.findOne({email});
        if(user)
        {
            ctx.response.status=422;
            ctx.response.body={message:"Email is already used"};
            return;
        }
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
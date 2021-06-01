import {Router,RouterContext} from "./deps.ts";
const router=new Router();
import authController from "./controllers/AuthController.ts";

router
    .get("/",(ctx: RouterContext)=>
    {
        ctx.response.body='Hello World';
    })
    .post('/api/login',authController.login)
    .post('/api/register',authController.register);

export default router;
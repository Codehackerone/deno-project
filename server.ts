import { Application,Router,RouterContext,config } from "./deps.ts";

const app=new Application();
import router from "./router.ts";

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen',({hostname,port,secure})=>
{
    console.log(`Listening on ${secure ? 'https://':'http://'}${hostname || 'localhost'}:${port}`);
    
});

await app.listen({port:8001});
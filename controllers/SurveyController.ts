import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
class SurveyController{
    async getAllForUser(ctx:RouterContext){
        // ctx.response.body="found";
        ctx.response.body=await Survey.findByUser("1");
    }
    async getSingle(ctx:RouterContext){
    
    }
    async create(ctx:RouterContext){
        const {name,description}=await ctx.request.body().value;
        const survey=new Survey('1',name,description);
        await survey.create();
        ctx.response.status=201;
        ctx.response.body=survey;
    }
    async update(ctx:RouterContext){
        const {name,description}=await ctx.request.body().value;
    }
    async delete(ctx:RouterContext){
    
    }
}

const surveyController=new SurveyController();
export default surveyController;